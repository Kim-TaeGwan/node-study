/*
    path 모듈은 파일과 디렉터리 경로 작업을 위한 유틸리티를 제공한다.
    path 같은 모듈이 필요한 이유는 운영체제별로 파일 경로를 관리하는 방식이 조금씩 다른데,
    이것을 개발자가 운영체제별로 일일이 코드를 작성해서 사용하는 것이 쉽지 않기 때문이다.
*/

const path = require("path");

console.log(__filename); // 현재 파일의 절대 경로
console.log(path.basename(__filename)); // path.basename는 경로의 마지막 부분
console.log(path.basename(__filename, ".js")); // 경로의 마지막 부분에서 확장자를 제거한 이름

/*
    path.delimiter
    운영체제별로 환경 변수 구분자를 가져온다. 윈도우는 세미콜론(;)을 사용하고, 맥과 리눅스 같은 POSIX는 콜론(:)을 사용한다.
 */
console.log(path.delimiter); // 환경 변수 구분자 - 윈도우는 세미콜론(;), POSIX 계열을 콜론(:)
// 운영체제별로 환경 변수에 설정된 path 정보는 다음과 같이 가져올 수 있다.
console.log(process.env.PATH);
process.env.PATH.split(path.delimiter);

// path.dirname() 파일이 위치한 폴더 경로를 반환한다.
console.log(path.dirname(__filename));

//path.extname() 파일의 확장자를 반환
console.log(path.extname("index.html"));

/*
    path.format(pathObject)
    pathObject에는 dir, root, base, name, ext 프로퍼티가 있다. pathObject로 주어진 프로퍼티를 사용해서 경로 문자열을 반환
    - dir 값이 주어지면 root 값이 주어지더라도 무시된다
    - base 값이 주어지면 ext, name 값이 주어지더라도 무시된다.
*/
console.log(
  path.format({
    root: "/ignored", // dir 값이 있으므로 root는 무시됨
    dir: "/home/user/dir",
    base: "file.txt",
  })
);
console.log(
  path.format({
    root: "/", // dir 값이 있으므로 root는 무시됨
    base: "file.txt",
    ext: "ignored", // base 값이 있으므로 ext는 무시됨
  })
);
console.log(
  path.format({
    root: "/", // dir 값이 있으므로 root는 무시됨
    name: "file",
    ext: ".txt",
  })
);

// path.isAbsolute(path) 주어진 파일의 경로가 절대 경로인지 상대 결로인지 알 수 있다. 절대 경로이면 true를 반환한다.

// path.join([...paths]) 문자열로 주어진 경로들을 모두 합쳐서 하나의 경로로 만들어서 반환한다.
console.log(path.join("/foo", "bar", "baz/asdf"));

// path.parse(path) path.format() 함수와 반대로 문자열로 된 경로를 pathObject로 반환
console.log(path.parse("/home/user/dir/file.txt"));

/*
  path.sep
  경로 구분자를 반환한다. 윈도우는 역슬래시, 맥과 윈도우 같은 POSIX 계역을 슬래시를 반환한다.
*/
console.log(path.sep);
