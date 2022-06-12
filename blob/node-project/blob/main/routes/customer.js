const express = require('express');

//express.Router()를 사용하면 라우트 처리를 하나의 파일에서 하는 것이 아니라 여러개의 파일 분리해서 각각의 용도(기능)에 맞게 구현하여 사용할수 있다.
const router = express.Router();

// 고객 정보를 위한 라우트
// app.js에서 기본 경로에 /customer 를 사용하기 때문에 /customer 라우트 경로를 가짐
router.get('/',function (req,res){
    res.send('customer 라우트 루트')
})

// 고객 정보 추가를 위한 라루트
// app.js에서 기본 경로에 /customer 를 사용하기 때문에 /customer/insert 라우트 경로를 가짐
router.post('/insert', function (req,res){
    res.send('/customer/insert 라우트')
})

// 고객 정보 수정을 위한 라우트
// app.js에서 기본 경로에 /customer 를 사용하기 때문에 /customer/update 라우트 경로를 가짐
router.put('/update',function (req,res){
    res.send('/customer/update 라우트')
})

// 고객 정보 삭제를 위한 라우트
// app.js에서 기본 경로에 /customer 를 사용하기 때문에 /customer/delete 라우트 경로를 가짐
router.delete('/delete', function (req,res){
    res.send('/customer/delete 라우트')
})

module.exports = router
