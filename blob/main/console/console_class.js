/*
    Console 클래스는 Node.js에서 파일 쓰기와 같은 스트림에 사용될 수 있다.
    Console 클래스를 사용하면 log 파일을 만들어서 
    console.log(), console.error(), console.warn()과 같은 함수를 사용하여 디버깅 혹은 각종 정보성 메시지를 파일로 기록힐 수 있다.
 */

const fs = require("fs");

const { Console } = require("console");

const output = fs.createWriteStream("./stdout.log"); // 파일 쓰기가 가능하도록 스트림 생성
const errorOutput = fs.createWriteStream("./stderr.log"); // 파일 쓰기가 가능하도록 스트림 생성

const logger = new Console({ stdout: output, stderr: errorOutput }); // 콘솔 객체 생성
const count = 5;

logger.log("count: %d", count); // stdout.log 파일에 count: 5 기록
logger.error("count: ", count); // stderr.log 파일에 count: 5 기록
