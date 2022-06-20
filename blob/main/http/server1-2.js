const http =require('http');

http.createServer((req,res)=> {
    /*
    *  res.writeHead 는 응답에 대한 정보를 기록, 첫 번쨰 인수로 성공적은 요청임을 의미하는 200
    * 두번째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고 있다.
    * 또한 한글 표시를 위해 charset을 utf-8로 지정했다. 이 정보가 기록되는 부분을 헤더(Header)라고 부른다.
    */
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    /*
    * res.write 메서드의 첫번쨰 인수는 클라이언트로 보낼 데이터이다.
    * 지금은 HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있다. 또한, 여러 번 호출해서 데이터를 여러 개 보내도 된다.
    * 데이터가 기록되는 부분을 본문(body)라고 부른다.
    */
    res.write('<h1>Hello Node!</h1>');
    /*
    * res.end는 응답을 종료하는 메서드이다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다.
    */
    res.end('<p>Hello Server!</p>')
})
.listen(8080,()=> { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다.')
});


http.createServer((req,res)=> {
    /*
    *  res.writeHead 는 응답에 대한 정보를 기록, 첫 번쨰 인수로 성공적은 요청임을 의미하는 200
    * 두번째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고 있다.
    * 또한 한글 표시를 위해 charset을 utf-8로 지정했다. 이 정보가 기록되는 부분을 헤더(Header)라고 부른다.
    */
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    /*
    * res.write 메서드의 첫번쨰 인수는 클라이언트로 보낼 데이터이다.
    * 지금은 HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있다. 또한, 여러 번 호출해서 데이터를 여러 개 보내도 된다.
    * 데이터가 기록되는 부분을 본문(body)라고 부른다.
    */
    res.write('<h1>Hello Node!</h1>');
    /*
    * res.end는 응답을 종료하는 메서드이다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다.
    */
    res.end('<p>Hello Server!</p>')
})
    .listen(8081,()=> { // 서버 연결
        console.log('8081번 포트에서 서버 대기 중입니다.')
    });
