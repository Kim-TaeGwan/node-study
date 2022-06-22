const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
/*
* 클러스테에는 마스터 프로세스와 워커프로세스가 있다.
* 프로세스는 CPU 개수만큼 워커 프로세스를 만들고, 8086번 포트에서 대기한다.
* 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배한다.
* 워커 프로세스가 실질적인 일을 하는 프로세스이다.
*
* 실제 PC에서는 CPU 코어가 10개라서 워커가 10새 생성되었다다*/
if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        /*
        * 워커 프로세스가 존재하기에 PC의 코어 개수인 10번 까지는 오류가 발생해도 서버가 정상 작동할 수 있다는 뜻이다.
        * cluster.fork(); 를 추가하여 종료된 워커를 다시 켜면 오류가 발생해도 계속 버틸 수 있다.
        *
        * 이제 워커 하나가 종료될 때마다 새로운 워커 하나가 생성된다. 하지만 이러한 방식으로 오류를 처리하려는 것은 좋지 않은 생각이다.
        * 오류 자체의 원인을 찾아 해결해야 한다. 그래도 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있어 클러스터링을 적용해 두는 것이 좋다.
        * 직접 cluster 모듈로 클러스터링을 구현할 수도 있지만, 실무에서는 pm2 등의 모듈로 cluster 기능을 사용하곤 한다.
        */
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
        /*
        * 요청이 들어올 때마다 1초 후에 서버가 종료되도록 했다.
        * 서버를 실행하면 process.pid 는 실행할 때마다 달라지며 PC의 코어 개수에 맞게 워커가 실행된다.
        * http://localhost:8086 에 접속하면 1초 후 콘솔에 워커가 종료되었다는 메세지가 뜬다.
        * console.log('code', code, 'signal', signal); 에서 code 는 process.exit 의 인수로 넣어준 코드가 출력되고,
        * signal 는 존재하는 경우 프로세스를 종료한 신호의 이름이 출력된다.
        */
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}
