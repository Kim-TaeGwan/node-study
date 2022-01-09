fetch("http://localhost:3000/posts", {
  method: "POST",
  body: JSON.stringify({
    // 전송할 데이터
    title: "The Great",
    author: "Jeremy",
  }),
  headers: {
    // 헤더 값 정의
    "content-type": "application/json; charset=UTF-8", // content-type 정의
  },
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error.response));
