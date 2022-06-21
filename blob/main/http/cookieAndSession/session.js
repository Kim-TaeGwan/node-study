const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie='') =>
    cookie
        .split(';')
        .map(v=>v.split('='))
        .reduce((acc,[k,v])=> {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});

/*
* 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통한다.
* 세션 아이디는 꼭 쿠키를 사용해서 주고받지 않아도 된다.
* 하지만 많은 웹 사이트가 쿠키를 사용한다. 쿠키를 사용하는 방법이 제일 간단하기 때문이다.
* 세션을 위해 사용하는 쿠키를 세션 쿠키라고 부른다.
*
* 실제 배포용 서버에서는 세션을 변수에 저장하지 않는다.
* 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되기 때문이다. 또한, 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생긴다.
* 그래서 보통은 레디스(Redis)나 맴캐시드(Memcached) 같은 데이터베이스에 넣어둔다.
*
* 서비스를 새로 만들 때마다 쿠키와 세션을 직접 구현할 수는 없다. 게다가 지금 코드로는 쿠키를 악용한 여러 가지 위협을 방어하지도 못한다.
* 따라서 절대로 아래 코드를 실제 서비스에 사용하면 안된다.
*
* 안전하게 사용하기 위해서는 다른 사람들이 만든 검증된 코드를 사용하는 것아 좋다.
*/

const session = {};

http.createServer(async (req,res)=> {
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5)
        // 쿠키에 이름을 담아서 보내는 대신 uniqueInt 라는 숫자 값을 보낸다.
        // 사용자의 이름과 만료 시간은 uniqueInt 속성명 아래에 있는 session 이라는 객체에 대신 저장한다.
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        res.writeHead(302,{
            Location:'/',
            'Set-Cookie':`session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }else if(cookies.session && session[cookies.session].expires > new Date()) {
        // 세션 쿠키가 존재하고, 만료 시간이 지나지 않았다면
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }else {
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        }catch (err) {
            res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'})
            res.end(err.message);
        }
    }
})
.listen(8085,()=> {
    console.log('8085번 포트에서 서버 대기 중입니다!')
})
