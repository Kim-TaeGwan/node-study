const http = require('http');
const fs = require('fs').promises;

/*
* res.write 와 res.end 에 일일이 HTML 을 적는 것은 비효율적이므로 미리 HTML 파일을 만들어두면 좋다.
* 그 HTML 파일을 fs 모듈로 읽어서 전송 할 수 있다.
* */

http.createServer(async (req,res) => {
    /*
    * 요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽는다. dat 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 된다.
    * 이전 예제에서는 문자열을 보냈지만, 이렇게 버퍼를 보낼 수도 있다.
    * 예기치 못한 에러가 발샌한 경우에는 에러 메시지를 응답한다.
    * 에러 메시지는 일반 문자열이므로 text/plain 을 사용했다.
    * */
    try{
        const data =await fs.readFile('./server2.html');
        res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'})
        res.end(data)
    }catch (err){
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'})
        res.end(err.message)
    }
})
.listen(8081,()=> {
    console.log('8081번 포트에서 서버 대기 중입니다.')
})
