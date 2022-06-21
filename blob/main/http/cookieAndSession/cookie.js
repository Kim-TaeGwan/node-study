const http = require('http');
/*
* 쿠키는 요청의 헤더(cookie)에 담겨 전송된다.
* 브라우저는 응답의 헤더(Set-Cookie)에 따라 쿠키를 저장한다.
*/
http.createServer((req,res) => {
    console.log(req.url,req.headers.cookie);
    /*
    * createServer 메서드의 콜백에서는 req 객체에 담겨 있는 쿠키를 가져온다.
    * 쿠키는 req.headers.cookie 에 들어있다, req.headers는 요청의 헤더를 의미한다.
    * 쿠키는 요청과 응답의 헤더를 통해 오고간다.
    * */
    res.writeHead(200,{'Set-Cookie':'mycookie=test' }); // 쿠키 생성
    /*
     * 응답의 헤더에 쿠키를 기록해야 하므로 res.writeHead 메서드를 사용.
     * Set-Cookie 는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미이다.
     * 실제로 응답을 받은 브라우저는 mycookie=test 라는 쿠키를 저장한다.
     *
     * localhost:8083 에 접속한다. req.url 과 req.headers.cookie 에 대한 정보를 로깅하도록 했다.
     * req.url 의 주소의 path 와 search 부분을 알린다.
     *
     * 요청은 분명 한 번만 보냈는데 두 개가 기록되어 있다. /favicon.ico 는 요청한 적이 없는데 말이다.
     * 첫 번쨰 요청(/) 에서는 쿠키에 대한 정보가 없다고 나오며, 두 번쨰 요청(/favicon.ico) 에서는
     * {mycooikie : 'test'}가 기록되었다.
     *
     * 브라우저는 파비콘이 뭔지 HTML 에서 유추 할 수 없으면 서버에 파비콘 정보에 대한 요청을 보낸다.
     * 현재 예제 에서는 HTML 에 파비콘에 대한 정보를 넣어두지 않았으므로 브라우저가 추가로 /favicon.ico 를 요청한 것이다.
     *
     * 요청 두 개를 통해 우리는 서버가 제대로 쿠키를 심었음을 확인할 수 있다. 첫 번째 요청(/)을 보내기 전에는 브라우저가 어떠한 쿠키 정보도 가지고 있지 않다.
     * 서버는 응답의 헤더에 mycoolie-test 라는 쿠키를 심으라고 브라우저에게 명령(Set-Coolie)했다.
     * 따라서 브라우저는 쿠키를 심었고, 두 번째 요청(/favicon.ico)의 헤더에 쿠키가 들어 있음을 확인 할 수 있다.
     *
     * 아직까지는 단순한 쿠키만 심었을 뿐, 그 쿠키가 나인지를 식별해주지 못하고 있다.

     */
    res.end('Hello Cookie');
})
.listen(8083,()=> {
    console.log('8083번 포트에서 서버 대기 중입니다.')
});
