/*
* https 모듈은 웹 서버에 SSL 암호화를 추가한다.
* GET 이나 POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없게 한다.
* 요즘은 로그인이나 결제가 필요한 창에서 https 적용이 필수가 되는 추세이다.
*
* 이 서버에 암호화를 적용하려면 https 모듈을 사용해야 한다. 하지만 https 는 아무나 사용할 수 있는 것이 아니다.
* 암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요하다.
* 인증서는 인증 기관에서 구입해야 하며, Let's Encrypt 같은 기관에서 무료로 발급해주기도 한다.
*
* 인증서 발급 과정은 복잡하고 도메인도 필요하다.
*/

const http = require('http');

http.createServer((res,req) => {
    res.writeHead(500,{'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>')
    res.end('<p>Hello Server!</p>')
})
.listen(8080,()=> {
    console.log('8080번 포트에서 서버 대기 중입니다!')
})
