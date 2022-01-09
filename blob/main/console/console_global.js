console.log("hello world"); // 일반적인 로그
console.log("hello %s", "world"); // 일반적인 로그, %s를 사용해서 문자열 데이타를 파라미터로 전달

const world = "world";
console.log(`hello ${world}`);

console.error(new Error("에러 메시지 출력")); // 에러 로그 출력

const arr = [
  { name: "John Doe", email: "john@mail.com" },
  { name: "Jermy Go", email: "jermy@mail.com" },
];
console.table(arr); // 테이블 형태로 배열/오브젝트 데이터 출력

const obj = {
  students: {
    grade1: { class1: {}, class: {} },
    grade2: { class1: {}, class: {} },
    teachers: ["John Doe", "Jere,y Go"],
  },
};

console.dir(obj, { depth: 1, colors: true }); // 오브젝트를 콘솔에 출력하는데, 출력할 오브젝트의 깊이와 콘솔 메시지 텍스트에 색상을 적용

console.time("time for for-loop"); // console.time에 파라미터로 전달한 레이블과 뒤에 나오는 console.timeEnd 중 일치하는 레이블을 가지고 있는 consle.timeEnd 코드 사이의 실행 시간 측정

for (let i = 0; i < 999999; i++) {}

console.timeEnd("time for for-loop"); // 앞에 나온 console.time 중 consle.timeEnd와 레이블이 일치하는 코드 사이의 실행 시간 측정

/*
    console.time(레이블) / console.timeEnd(레이블)
    console.time과 console.timeEnd에 전달한 인수 값이 일치하는 코드 사이의 실행 시간을 측정해서 출력한다. 기본값은 default 이다.

    console.dir(오브젝트, 옵션)
    객체를 콘솔에 출력할 때 사용한다. 첫번쨰 파라미터는 객체이고, 두번쨰 파마리터는 옵션이다.
    옵션의 depth는 객체 안의 객체를 몇 단계까지 보여줄지 뜻한다.
    colors는 콘솔에 출력될 떄 다른 색상을 사용해서 쉽게 구분할 수 있다.
*/
