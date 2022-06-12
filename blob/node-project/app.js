const express = require('express');
const app = express();
const port = 3000; // 서버 포트 번호
const customerRouter = require('./blob/main/routes/customer');
const productRouter = require('./blob/main/routes/product');
const compression = require('compression');


// 클라이언트에서 HTTP 요청 메소드 중 GET을 이용해서 'host:port'로 요청을 보내면 실행되는 라우트
app.get('/',(req,res) => {
    res.send('root') // 클라이언트에 root 문자열 전송
})

// 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:port/about'을 호출했을 때.
app.get('/about', function (req,res) {
    res.send('about'); // 클라이언트에 about 문자열 전송
})

// app.listen() 함수를 사용해서 서버를 실행.
// 클라이언트는 'host:port' 로 노드 서버에 요청을 보낼 수 있다.
app.listen(port, () => {
    console.log(`Server started, port 3000.`,)
})

// 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:3000/customer' 로 호출했을 때
app.get('/customer',function (req,res) {
    res.send('get 요청에 대한 응답')
})

// 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:3000/customer' 로 호출했을 때
app.post('/customer',function (req,res) {
    res.send('post 요청에 대한 응답')
})


// 문자영 패턴

// GET 방식으로 'host:port/acd' 혹은 'host:port/abcd'를 호출했을 때
// 'b?'는 문자 'b'가 0개 혹은 1개 있다는 것을 의미
app.get('/ab?cd', function (req,res) {
    res.send('ab?cd')
})

// 클라이언트에서 요청한 라우트 경로가 abcd, abbbcd 등과 일치
// 'b+' 는 문자 'b'가 1개 이상 있다는 것을 의미
app.get('/ab+cd', function (req,res) {
    res.send('ab+cd')
})

// 클라이언트에서 요청한 라우느 경로가 abcd, abxcd,abanycd,ab123cd 등과 일치
// 'ab*cd' 는 문자 'ab' 와 문자 'cd' 사이에 문자가 없거나 혹은 어떤 문자도 올 수 있다는 것을 의미
app.get('/ab*cd', function (req,res) {
    res.send('ab*cd')
})


// 정규식을 기반

//  클라이언트에서 요청한 라우트 경로에 'a'가 포함되어 있는 경우
app.get('/a/', function (req,res) {
    res.send('/a/')
})

// 클라이언트에서 요청한 라우트 경로가 문자 'insert' 로 시작하는 경우
// insertCustomer, insertProduct
app.get('/^insert/', function (req,res) {
    res.send('/^insert/')
})

app.get('/content',function (req,res) {
    res.send('content')
})

// 콜백 함수의 세번째 파라미터로 next 오브젝트 사용
// app.get('/example', function (req,res,next) {
//     console.log('첫 번째 콜백 함수');
//     next(); // 다음 콜백 함수 호출
// },function (req,res) {
//     res.send('두 번째 콜백 함수'); // 클라이언트로 응답
// })


const ex0 = function (req,res,next) {
    console.log('첫 번째 콜백 함수');
    next(); // 다음 콜백 함수 호출
}
const ex1 = function (req,res,next) {
    console.log('두 번째 콜백 함수');
    next(); // 다음 콜백 함수 호출
}
const ex2 = function (req,res) {
    res.send('세 번째 콜백 함수'); // 클라이언트로 응답
}

app.get('/example',[ex0,ex1,ex2])

// 모듈식 라우터 - 하나의 라우트 경로로 각 라우트 메소드 처리
// app.route('/customer')
//     .get(function (req,res) { // HTTP 메소드 GET 요청에 대한 조회 처리
//         res.send('고객 정보 조회')
//     })
//     .post(function (req,res) { // HTTP 메소드 POST 요청에 대한 저장 처리
//         res.send('신규 고객 추가')
//     })
//     .put(function (req,res) { // HTTP 메소드 PUT 요청에 대한 수정 처리
//         res.send('고객 정보 수정')
//     })
//     .delete(function (req,res) { // HTTP 메소드 DELETE 요청에 대한 삭제 처리
//         res.send('고객 정보 삭제')
//     })

app.use('/customer', customerRouter);
app.use('/product', productRouter);

app.get('/error',function (req,res) {
    throw new Error('에러발생');
    // 라우트에서 에러가 발생하면 익스프레스가 알아서 이를 잡아서 처리한다.
    // 클라이언트로 500 에어 코드와 에러 정보를 전달한다.
})

app.use(function (err,req,res,next){
    res.status(500).json({statusCode:res.statusCode,errMessage:err.message});// 상태코드 500, 에러 메세지 전달
})

app.get('/error2', function (req,res,next) {
    next(new Error('에러 발생'));
    // next() 함수를 사용해서 에러처리 핸들러로 에러 전달
})

// body-parser
// parser application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended:false})

const jsonParser = express.json()

app.use(express.json({
    limit:'50mb'
})); // 클라이언트 서로 전송 할 수 있는 json 데이터의 최대 크기를 50mb 로 제한.

// 클라이언트로 부터 POST 방식으로 요청된 /login 라우터의 데이터는 UrlencodedParser 를 사용하는 것으로 정의
app.post('/login',urlencodedParser,function (req,res) {
    res.send('welcome, ' + req.body.username);
})

// 클라이언트로 부터 POST 방식으로 요청된 /api/users 라우터의 데이터는 jsonParser 를 사용하는 것으로 정의
app.post('/api/users',jsonParser,function (req,res) {
    // req.body 에서 사용정 정보 획득
})



// 클라이언트로 요청받은 라우터가 /api/getMap 인 경우에 대해서만 응답 데이터를 압축한다.
app.use('/api/getMap',compression())
