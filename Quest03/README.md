
# Quest 03. 자바스크립트와 DOM

## Introduction
* 자바스크립트는 현재 웹 생태계의 근간인 프로그래밍 언어입니다. 이번 퀘스트에서는 자바스크립트의 기본적인 문법과, 자바스크립트를 통해 브라우저의 실제 DOM 노드를 조작하는 법에 대하여 알아볼 예정입니다.

## Topics
* 자바스크립트의 역사
* 기본 자바스크립트 문법
* DOM API
  * `document` 객체
  * `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()` 함수들
  * 기타 DOM 조작을 위한 함수와 속성들
* 변수의 스코프
  * `var`, `let`, `const`

## Resources
* [자바스크립트 첫걸음](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps)
* [자바스크립트 구성요소](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks)
* [Just JavaScript](https://justjavascript.com/)

## Checklist
### 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

- **ES1, ES2, ES3, ES4 (1997 ~ 1999)**
  - 처음 3판이 해마다 나왔고 4번째 판은 언어에 얽힌 정치적인 차이로 인해 버려짐
- **ES5 (2009)**
  - 배열 메소드(forEach, map, filter, reduce, some, every 등) 추가
  - strcit
- **ES6 (ES2015)**
  - Default Parameters
  - Template Literals (string 을 합칠 때 더이상 +를 붙이지 않아도 된다!)
  - Multi-line Strings
  - Destructuring Assignment
  - Enhanced Object Literals
  - Arrow Functions
  - Promises
  - Block-Scoped Constructs Let and Const
  - Classes
  - Modules
- **ES7 (ES2016)**
  - Array.protorype.includes()
  - Exponentiation oprator
- **ES8 (ES2017)**
  - String padding
  - Object.values and Object.entries
  - Object.getOwnPropertyDescriptors
  - Trailing commas in function parameter lists and calls
  - Async / Await
- **ES9 (ES2018)**
  - Object Rest/Spread
  - Promise finally
  - Async iteration
- **ES10 (ES2019)**
  - Object.fromEntries
  - Array.prototype.flat, Array.prototype.flatMap
  - String.prototype.trimStart, trimEnd, trimLeft, trimRight

- **ES2020**
  - Dynamic Import
  - String.prototype.matchAll
  - BigInt
  - Promise.allSettled
  - Nullish Coalescing Operator

#### 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?

- ES[숫자]의 숫자는 에디션 넘버, ES[년도]의 년도는 출판된 년도

ES[숫자] 와 같은 이름이 익숙하지만 ECMA International에서 매년 표준안을 업데이트 하기로 결정하면서 ES[연도]와 같은 이름이 붙습니다. 예를들면 ES6의 숫자는 에디션넘버, ES2015의 2015는 출판된 년도 입니다. 또한 ES5에서 ES6로 업데이트 되며 많은 변화가 있었기 때문에 ES6부터 이후버전을 통칭하여 ES6+라고 부르기도 합니다.

#### 자바스크립트의 표준은 어떻게 제정될까요?

ECMA Script는 [TC39 프로세스](https://tc39.es/process-document/) 를 통해서 제정 됩니다. 이 과정은 0단계에서 4단계까지 총 5단계로 나누어져 있고 각 단계로 승급을 위한 명시적인 조건들이 존재합니다.

- 0단계: 허수아비 (stage 0: strawman)
  - 별다른 제약 X, TC39의 컨트리뷰터로 등록한 누구라도 proposal 제출 가능
- 1단계: 제안 (stage 1: proposal)
  - 1단계가 되려면 해당 제안을 책임질 TC39의 구성원 (챔피언)을 구해야함
  - 1단계 프로포절은 풀고자 하는 문제와 하이 레벨 API 및 잠재적 장애물을 제시
- 2단계: 초고 (stage 2: draft)
  - 2단계로 올라오기 위해선 ECMAScript 표준의 형식 언어(formal description)로 작성 된 형식적인 서술(formal description) 초안이 필요
  - 실제로 표준에 편입 될 경우 사용할 명세의 초기 버전
- 3단계: 후보 (stage 3: candidate)
  - 3단계 프로포절은 대부분 완성에 가깝고, 구현 주체나 사용자들로부터 피드백을 좀 더 받아보는 일만이 남은 상태
  - 빈칸 없이 문법, 동작, 그리고 API까지 모든 부분이 기술되어 있도록 마무리 된 명세
  - 3단계까지 올라온 프로포절은 이후 구현상 심각한 문제가 발견되지 않는 이상 변경이 허용되지 않음
- 4단계: 완료됨 (stage 4: finished)
  - 표준에 포함되어 발표되기만을 기다리는 단계
  - 4단계까지 올라온 프로포절은 별다른 이변이 없는 이상 다가오는 새 표준에 포함되어 발표

---

### 자바스크립트의 문법은 다른 언어들과 비교해 어떤 특징이 있을까요?

- 느슨한 타입(Loose Typing)
- 실수와 정수 모두 Number 타입으로 사용
- 문자열은 immutable

#### 자바스크립트에서 반복문을 돌리는 방법은 어떤 것들이 있을까요?

- `for` `for/in` `for/of`
- `while` `do/while`
- `forEach`, `map`, `filter`, `reduce`, `reduceRight`, `every`, `some`, `indexOf`, `lastIndexOf`, `find`, `findIndex` 등 Array 및 iterable methods

---

### 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?

1. `className`
  - element.className = '클래스네임'
  - element.className += ' 클래스네임'
2. `classList`
  - element.classList.add('클래스1', '클래스2', ...)
  - element.classList.remove('클래스')

#### IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?

- className을 사용하거나 polyfill 사용

---

### 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

1. Glboal Scope
  - 모든 변수는 어떤 함수 안이나 블록 안에 있지 않으면 전역 스코프를 갖음
2. Local Scope or Function Scope
  - 함수안에 선언된 변수는 함수 안에서만 접근이 가능
3. Block Scope
  - let, const의 경우 블록스코프를 갖음
  - curly braces ( "{", "}" ) 안에서만 접근이 가능함

#### `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

자바스크립트는 실행가능한 코드를 실행시키면 단일 스택으로 Execution Context를 생성, 실행을 반복하면 서 실행됩니다. EC(Execution Context)가 생성될때 Lexical Environment를 구성(각 컨덱스트에 해당하는 변수나 함수 등을 선언) 하게 되고 EC가 실행되면서 해당 컨텍스트의 Lexical Environment에 값을 할당하거나 해당 변수/함수를 읽습니다. (실행시 만약 값을 찾지못하면 outer에 링크된 EC를 참조하게 되고 거슬러 올라가 Global EC까지 찾지 못하면 해당 스코프에 해당하는 변수/함수가 없다고 판단합니다.)

- `var` 로 선언된 변수는 함수 스코프
- `let` 으로 선언된 변수는 블록 스코프
- Lexical Environment를 생성할때 `var` 는 선언과 초기화까지 `let` 은 선언만 (uninitialized)
  - 따라서 실제 코드 상에서는 변수의 선언이 변수를 사용하는 코드보다 하단에 있다하면 EC의 실행단계에서 해당 변수에 대한 참조를 만나면 `var`는 접근 가능하지만 `let` 은 불가

---

### 자바스크립트의 익명 함수는 무엇인가요?

자바스크립트의 특징중 하나는 함수를 일급객체로 다룬다는 것(일급함수) 입니다. 따라서 함수자체를 변수에 할당하거나 파라미터, 리턴값으로 사용할 수 있습니다.

익명함수는 함수의 이름이 없는 함수 표현식이나 콜백, IIFE에 사용되는 함수 입니다.

#### 자바스크립트의 Arrow function은 무엇일까요?

화살표 함수(Arrow Function)은 function 키워드 대신 화살표(⇒) 를 사용하여 간략하게 함수를 선언하는 함수 입니다.

- this 바인딩 안됨
- arguments X
- super X , 생성자 함수로 사용X

---

## Quest
* (Quest 03-1) 초보 프로그래머의 영원한 친구, 별찍기 프로그램입니다.
  * [이 그림](jsStars.png)과 같이, 입력한 숫자만큼 삼각형 모양으로 콘솔에 별을 그리는 퀘스트 입니다.
    * 줄 수를 입력받고 그 줄 수만큼 별을 그리면 됩니다. 위의 그림은 5를 입력받았을 때의 결과입니다.
  * `if`와 `for`와 `function`을 다양하게 써서 프로그래밍 하면 더 좋은 코드가 나올 수 있을까요?
  * 입력은 `prompt()` 함수를 통해 받을 수 있습니다.
  * 출력은 `console.log()` 함수를 통해 할 수 있습니다.
* (Quest 03-2) skeleton 디렉토리에 주어진 HTML을 조작하는 스크립트를 완성해 보세요.
  * 첫째 줄에 있는 사각형의 박스들을 클릭할 때마다 배경색이 노란색↔흰색으로 토글되어야 합니다.
  * 둘째 줄에 있는 사각형의 박스들을 클릭할 때마다 `enabled`라는 이름의 CSS Class가 클릭된 DOM 노드에 추가되거나 제거되어야 합니다.
* 구현에는 여러 가지 방법이 있으나, 다른 곳은 건드리지 않고 TODO 부분만 고치는 방향으로 하시는 것을 권장해 드립니다.

## Advanced
* Quest 03-1의 코드를 더 구조화하고, 중복을 제거하고, 각각의 코드 블록이 한 가지 일을 전문적으로 잘하게 하려면 어떻게 해야 할까요?
* Quest 03-2의 스켈레톤 코드에서 `let` 대신 `var`로 바뀐다면 어떤 식으로 구현할 수 있을까요?
