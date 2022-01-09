// WHATWG API
const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);
console.log(myURL);

const myURL2 = new URL("https://example.org/foo#bar");
console.log(myURL2.hash);
myURL2.hash = "baz";
console.log(myURL2.href);

const myURL3 = new URL("https://example.org/?user=abc&query=xyz");
console.log(myURL3.searchParams.get("user")); // 키에 해당하는 첫 번쨰 값을 반환
console.log(myURL3.searchParams.has("user")); // 키가 존재하는지 체크하고 있으면 true, 없으면 false
console.log(myURL3.searchParams.keys()); // Iterator로 모든 키를 반환
console.log(myURL3.searchParams.values()); // Iterator로 모든 키를 반환
myURL3.searchParams.append("user", "admin"); // 주어진 키로 값을 추가. 동일한 키가 이미 있으면 그대로 유지하고 하나 더 추가
console.log(myURL3.searchParams.getAll("user")); // 키에 해당하는 값을 모두 배열로 반환
myURL3.searchParams.get("user", "admin"); // 주어진 키로 값을 추가. 동일한 키가 이미 있으면 모두 삭제하고 새로 추가
myURL3.searchParams.delete("user"); // 해당 키를 삭제
console.log(myURL3.searchParams.toString()); // searchParams 객체를 문자열로 반환
