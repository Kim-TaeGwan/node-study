const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

/*



* */



const parseCookies = (cookie = '') =>
    /*
    * 쿠키는 mycookie=test 같은 문자열이다. 이를 쉽게 사용하기 위해 자바스크립트 객체 형식으로 바꾸는 함수이다.
    * 이 함수를 거치면 {mycookie='test'}가 된다
    * parseCookies 함수가 문자열을 객체로 바꿔준다.
    */
    cookie
        .split(';')
        .map(v=>v.split('='))
        .reduce((acc,[k,v])=> {
        acc[k.trim()]=decodeURIComponent(v);
        return acc;
    },{});

http.createServer(async (req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    // 주소가 /login 으로 시작하는 경우
    if(req.url.startsWith('/login')) {
        /*
        * url 과 querystring 모듈로 각각 주소와 주소에 딸려오는 query 를 분석한다.
        * 그리고 쿠키의 만료 시간도 지금으로부터 5분 뒤로 설정했다.
        * 이제 302 응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣는다.
        * 브라우저는 이 응답 코드를 보고 페이지를 해당 주소로 리다이렉트한다.
        * 헤더에는 한글을 설정 할 수 없으므로 name 변수를 encodeURIComponent 메서드로 인코딩했다. 또한 Set-Coolie 의 값으로는 제한된 ASCII 코드만 들어가야 하므로 줄바꿈을 넣으면 안된다.
        */
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 +5분으로 설정
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302,{
            /*
            * Set-Cookie 로 쿠키를 설정할 때 만료 시간(Expires) 과 HttpOnly, Path 같은 옵션을 부여했다.
            * 쿠키를 설정 할 때는 각종 옵션을 놓을 수 있으며, 옵션 사이에 세미콜론(;)을 써서 구분하면 된다.
            * 쿠키에는 들어가면 안 되는 글자들이 있는데, 대표적으로 한글과 줄바꿈이 있다.
            * 한글은 encodeURIComponent 로 감싸서 넣는다.
            *
            * 쿠키명=쿠키값 : 기본적은 쿠키의 값이다. mycookie=test 같이 설정한다.
            * Expires=날짜 : 만료 기한이다. 이 기한이 지나면 쿠키가 제거된다. 기본값은 클라이언트가 종료될 떄까지 이다.
            * Max-age=초 : Expires 와 비슷하지만 날짜 대신 초를 입력할 수 있다. 해당 ㅊ토가 지나면 쿠키가 제거된다. Expires 보다 우선이다.
            * Domain=도메인 명 : 쿠키가 전송될 도메인을 특정할 수 있다. 기본값은 현재 도메인이다.
            * Path=URL : 쿠키가 전송될 URL 을 특정할 수 있다. 기본값은 '/'이고, 이 경우 모든 URL 에서 쿠키를 전송할 수 있다.
            * Secure : HTTPS 일 경우에만 쿠키가 전송된다.
            * HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없다, 쿠키 조작을 방지하기 위해 설정하는 것이 좋다.
            * */
            Location:'/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        res.end();
    }else if(cookies.name) {
        // name 이라는 쿠키가 있는 경우
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else {
        /*
        * 그 외의 경우(/로 접속했을 때 등), 먼저 쿠키가 있는지 없는지를 확인한다.
        * 쿠키가 없다면 로그인할 수 있는 페이지를 보낸다. 처음 방문한 경우에는 쿠키가 없으므로 coolie2.html 이 전송된다.
        * 쿠키가 있다면 로그인한 상태로 간주하며 인사말을 보낸다.
        */
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        }catch (err) {
            res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8084, ()=> {
    console.log('8084번 포트에서 서버 대기 중입니다.')
})
