const http2 = require('http2');
const fs = require('fs');

/*
* 인증서 발급 과정은 복잡하고 도메인도 필요하다.
* 발급 받은 인증서가 있다면 다음과 같이 하면 된다.
*
* createServer 메서드가 인수를 두 개 받는다.
* 두 번째 http 모듈과 같이 서버 로직이고, 첫 번째 인수는 인증서에 관련된 옵션 객체이다.
* 인증서를 구입하면 pem 이나 crt, 또는 key 확장자를 가진 파일들을 제공한다.
* 파일들을 fs.readFileSync 메서드로 읽어서 cert, key, ca 옵션에 알맞게 넣으면 된다.
* 실제 서버에서는 80포트 대신 443포트를 사용하면 된다.
*
* http2 모듈은 https 모듈과 거의 유사하다
* https 모듈을 http2로, createServer 메서드를 createSecureServer 메서드로 바꾸면된다.
*/
http2.createSecureServer({
    cert:fs.readFileSync('도메인 인증서 경로'),
    key:fs.readFileSync('도메인 비밀키 경로'),
    ca:[
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로')
    ],
},(req,res)=> {
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>')
    res.end('<h1>Hello Server!</h1>')
})
    .listen(443,()=> {
        console.log('443번 포트에서 서버 대기 중입니다!')
    })
