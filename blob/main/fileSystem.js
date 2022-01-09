const fs = require("fs");
const { off } = require("process");

// fs.readFile() 파일을 옵션으로 지정한 문자 인코딩을 사용해서 읽은 후 결과를 callback() 함수로 전달하는 비동기 방식 함수이다.
// 비동기 파일 읽기
fs.readFile("./stderr.log", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

// fs.readFileSync() 파일을 옵션으로 지정한 문자 인코딩을 이용해서 utf-8 형식으로 읽은 후 결과를 반환하는 동기 방식 함수이다.
const text = fs.readFileSync("./stderr.log", "utf8");
console.log(text);

// fs.writeFIle() 파일을 option 방식을 사용해서 data를 쓰고 callback() 함수로 결과를 전달하는 비동기 방식 함수이다.
let data = "파일 쓰기 테스트";
// 비동기 파일 쓰기
fs.writeFile("./stderr.log", data, "utf8", err => {
  if (err) {
    throw err;
  }
  console.log("비동기적 파일 쓰기 완료");
});

// writeFileSync() 파일을 option 방식을 사용해서 dat를 쓰는 동기 방식 함수이다.
// 동기 파일 쓰기
fs.writeFileSync("./stderr.log", data, "utf8");
console.log("동기적 파일 쓰기 완료");

/*
    fs.watchFile()
    watchFile() 함수는 매우 유용하게 사용할 수 있다.
    watchFile은 대상이 되는 파일의 변경 사항 여부를 감시할 수 있다. 변경 사항이 발생하면 지정한 콜백 리스너 함수를 실행시킬 수 있다.

    실무에서는 데이터베이스 조작을 위한 쿼리문을 작성한 파일을 watchFile() 함수로 감시하고 Node.js 서버를 재시작하지 않아도 변경된 내용을 바로 반영할 때 watchFile() 함수를 가장 많이 사용한다.

    실제 개발을 진행하면 데이터베이스 조회, 생성, 수정, 삭제 같은 쿼리는 계속 추가되고 수정된다. 이럴 때마다 변경 사항이 바로 반영되지 않고 Node.js 서버를 재시작해야한다면 개발 진행 시 굉장히
    불편할 수밖에 없다. 이 경우 watchFile() 함수를 사용해서 파일 내용에 변경 사항이 발생할 때 Node.js 서버 재시작 없이 바로 반영할 수 있도록 구현해 놓으면 정말 유용하다.
*/

// sql 쿼리문을 관리하는 sql.js 파일에 변경 사항, 즉 쿼리문이 수정되거나 추가되면 이를 감지하고 반영하도록 한 코드이다.
let sql = require("./sql.js"); // 데이터베이스 쿼리문이 작성되어 있는 파일
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  // sql.js 파일에 변경이 일어났는지 감시하고 변경이 일어나면 콜백 리스너 함수 실행
  console.log("sql 변경 시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")]; // 캐시에 저장되어 있는 파일 삭제
  sql = require("./sql.js"); // sql.js 파일에 변경이 일어날 때마다 sql.js 재할당
});
