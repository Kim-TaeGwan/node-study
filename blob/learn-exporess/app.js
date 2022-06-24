const express = require('express');
const path = require('path');

const app = express(); // express 내부에 http 모둘이 내장되어 있으므로 서버의 역할을 할 수 있다.
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트를 설정. app.set(키,값)을 사용해서 데이터를 저장 할 수 있다. 니중에 데이터를 app.get(키)로 가져올 수 있다.

/*
* app.get(주소, 라우터)는 주소에 대한 GET 요청이 올 떄 어떤 동작을 할지 적는 부분이다.
* 매개변수 req 는 요청에 관한 정보가 들어 있는 객체이고, res 는 응답에 관한 정보가 들어 있는 객체이다.
* express 에서는 res.write 나 res,end 대신 res.send 를 사용하면 된다.
*/
app.get('/',(req,res) => {
    // res.send('Hello, Express');
    // HTML 로 응답함. res.sendFile 메서드를 사용. 단, 파일의 경로를 path 모듈을 사용해서 지정
    res.sendFile(path.join(__dirname, '/index.html'));
});

/*
* listen 을 하는 부분은 http 웹 서버와 동일하다.
* 포트를 연결하고 서버를 실행한다.
* 포트는 app.get('port') 로 가져왔다.
*/
app.listen(app.get('port'),()=> {
    console.log(app.get('port'),'번 포트에서 대기 중');
})
