/*
    Node.js의 이벤트 루프는 다른 콜백 함수보다 nextTick에 인수로 전달한 콜백 함수를 우선적으로 처리한다.
    nextTick을 통해 추가한 콜백 함수는 'next tick queue'에 추가된다.
*/
const { nextTick } = require("process");

console.log("start");

setTimeout(() => {
  console.log("timeout callback");
}, 0);

nextTick(() => {
  console.log("nextTick callback");
});
console.log("end");
