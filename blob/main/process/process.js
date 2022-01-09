/*
    process 객체는 현재 실행되고 있는 Node.js 프로세스에 대한 정보와 제어를 제공한다.
    전역으로 사용할 수 있지만 require 또는 import를 통해 명시적으로 호출해서 사용하는 것이 좋다.

    프로세스 객체는 EventEmitter의 인스턴스로 다음과 같은 이벤트가 발행하 때 마다 리스너를 등록할 수 있다.

    - beforeExit : Node.js가 이벤트 루프를 비우가 예약할 추가 작업이 없을 때 발생되는 이벤트이다.
    일반적으로 Node.js 프러세스는 예정된 작업이 없는 경우 종료되지만, beforeExit 이벤트에 등록된 리스너가 비동기식 호출을 하여 Node.js 프로세스를 계속 할 수 있다.

    - exit: exit 이벤트는 process.exit()를 호출하거나 Node.js 이벤트 루프가 더 이상 수행할 추가 작업이 없을 떄 발생한다.
    이 시점에서 이벤트 루프가 종료되는 것을 막을 수 있는 방법이 없으며 exit 이벤트에 등록된 리스너가 실행을 마치면 Node.js 프로세스는 종료된다.

    프로세스의 각 이벤트는 process.on을 통해 리스너를 등록해서 사용할 수 있다.
*/

const process = require("process");

process.on("beforeExit", code => {
  console.log(
    "2. 이벤트 루프에 등록된 작업이 모두 종료된 후 노드 프로세스를 종료하기 직전 : ",
    code
  );
});

process.on("exit", code => {
  console.log("3. 노드 프로세스가 종료될 떄 : ", code);
});

console.log("1. 콘솔에 출력되는 첫 번째 메시지");
