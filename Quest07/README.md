# Quest 07. node.js의 기초

## Introduction
* 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics
* node.js
* npm
* CommonJS와 ES Modules

## Resources
* [About node.js](https://nodejs.org/ko/about/)
* [Node.js의 아키텍쳐](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174356/node-js%EC%9D%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)
* [npm](https://docs.npmjs.com/about-npm)
* [npm CLI commands](https://docs.npmjs.com/cli/v7/commands)
* [npm - package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
* [How NodeJS Require works!](https://www.thirdrocktechkno.com/blog/how-nodejs-require-works)
* [MDN - JavaScript Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
* [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
* [require vs import](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/)

## Checklist

---
### node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?

node.js 는 자바스크립트 런타임 입니다. 즉, 자바스크립트는 단순한 언어이고 node.js는 자바스크립트로 작성된 코드를 실행할 수 있는 일종의 실행기 입니다.

node.js 는 내장 라이브러리와 v8엔진 그리고 libuv로 구성되어 있습니다. v8은 70%이상, libuv는 100% C++로 구성된 라이브러리 입니다. node.js의 특성인 이벤트 기반, 논블로킹 I/O 모델들은 모두 libuv 라이브러리에 구현됩니다. libuv는 윈도우나 리눅스 커널을 추상화 하여 랩핑하고 있는 구조 입니다. 즉, libuv는 OS 커널에서 어떤 비동기 작업들을 지원해주는 지 알고 있기 때문에 커널을 사용하여 처리할 수 있는 비동기 작업을 발견하면 바로 커널로 작업을 넘겨버리고, OS가 지원하지 않는 비동기가 있다면 자체 thread pool을 이용하여 비동기를 처리합니다. 이벤트 루프는 여러 개의 페이즈(Phase)들을 갖고 있으며, 해당 페이즈들은 각자만의 큐(Queue)를 갖습니다. 이벤트 루프는 라운드 로빈(round-robin) 방식으로 노드 프로세스가 종료될때까지 일정 규칙에 따라 여러개의 페이즈들을 계속 순회합니다. 페이즈들은 각각의 큐들을 관리하고, 해당 큐들은 FIFO(First In First Out) 순서로 콜백함수들을 처리합니다. 즉, 싱글 쓰레드 이지만 비동기는 별도의 쓰레드풀, 워커에서 처리하고 메인쓰레드로 돌려 주어 메인쓰레드에서의 블로킹을 해결합니다.

---

### npm이 무엇인가요?`package.json`파일은 어떤 필드들로 구성되어 있나요?

npm(node package manager)은 이름 그래도 노드 패키지 모듈 관리자 입니다. node.js로 만들어진 모듈을 관리해 줍니다.

```json
{
    "name": "foobar", // (필) 패키지의 이름
    "version": "0.0.1", // (필) 패키지의 버전
    "description": "description", // 패키지 설명
    "keywords": ["key", "word"], // npm search시 검색어가 될 키워드
    "homepage": "https://homepage.com", // 프로젝트 홈페이지
    "bugs": { // 이슈 및 버그 트레킹을 볼 수 있는 URL과 이메일
        "email": "bug@gmail.com",
        "url": "https://bug.com"
    },
    "license": "MIT", // 패키지의 라이센스
    "files": ["*"], // 프로젝트에 포함된 파일의 배열
    "main": "index.js", // 프로그램의 시작점이 되는 모듈
    "repository": {  //  저장소 위치
        "type": "git",
        "url": "https://github.com/npm/cli.git"
    },
    "scripts": { // npm run [SOMETHING] 했을때 실행될 스크립트
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "config": { // 패키지 버전에 상관없이 스크립트에서 사용될 수 있는 설정 정보
        "port": "8080"
    },
    "dependencies": { // 패키지에 필요한 디팬던시 패키지들
        "@types/refractor": "^3.0.0",
        "cheerio": "^1.0.0-rc.5",
        "crypto-hash": "^1.3.0"
    },
    "devDependencies": { // 개발시에만 필요한 패키지 디팬던시들
        "@types/lodash": "^4.14.168",
        "@types/node": "^15.0.2"
    },
    "peerDependencies": { // 패키지가 다른모듈의 디팬던시가 될 경우 호환 버전 명시
        "tea": "2.x"
    },
    "peerDependenciesMeta": { // 피어 디팬던시의 메타 정보
        "soy-milk": {
            "optional": true
        }
    },
    "bundledDependencies": [  // 패키지를 퍼블리싱할 때 번들되는 패키지 이름들의 목록
        "renderized",
        "super-streams"
    ],
    "private": true,
    "workspaces": [
        "./packages/*"
    ],
		"engines": {  // 동작 가능한 노드의 버전 지정
		    "node": ">=0.10.3 <15"
		},
		"os": [  // 작동 운영체제 
		    "darwin",
		    "linux"
		],
		"cpu": [ // 작동 cpu 아키텍처
		    "x64",
		    "ia32"
		]
	등등...
	}
```

---

### npx는 어떤 명령인가요? npm 패키지를`-g`옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

npx는 node.js 의 패키지를 실행 시키는 도구 입니다. 우선 로컬을 탐색해서 해당 패키지를 찾고 존재하지 않으면 npm 레지스트리에서 다운로드 받아 설치 없이 실행합니다. 기존에는 node.js 패키지를 실행 하기 위해서는 반드시 해당 npm 프로젝트 혹은 글로벌에 설치한후 실행 하였어야 했습니다. npx는 npm5.2 버전 이후에 추가되어 보통 설치없이 일회성으로 실행되야할 node.js 패키지를 실행할 때 주로 사용합니다.

글로벌 옵션 없이 패키지를 설치 하면 해당 프로젝트 하위에 패키지가 설치됩니다. 글로벌 옵션을 사용하면 전역으로 설치가 되고 해당 프로젝트에는 포함되지 않지만 어디서든 사용할 수 있습니다.

---

### 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

- AMD (Asynchronous module definition)
- CommonJS
- UMD (Universal Module Definition)

ES6 이전에는 ECMAScript 스펙에 모듈이라는 개념이 존재하지 않았습니다. 따라서 모듈간 의존성을 관리하기 위해 AMD, CommonJS와 같은 여러 모듈 개념이 만들어졌었고 이후 ES6에 정식으로 ECMAScript 스펙에 모듈 개념이 등장하여 표준 스펙이 만들어 졌습니다.

---

### ES Modules는 기존의`require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

CJS는 스크립트를 바로 실행하지만, ESM은 모듈 로더가 비동기적으로 entry파일의 구문 분석을 통해 디팬던시를 찾고 또다시 구문 분석을 반복하며 모듈 그래프를 만들고 스크립트 실행준비를 마치고 실행 합니다.

CJS는 단순히 디팬던시를 로드하고 실행 시키지만, ESM은 모듈로더가 구문 분석을 통해 모듈 그래프를 만들고 메모리에 공간을 만들고 할당 및 실행을 합니다. 따라서 메인쓰레드를 차단 하지 않고 비동기적으로 로드가 가능하고 트리쉐이킹 하기도 수월 합니다.

ESM의 import는 모듈명을 동적으로 정해 런타임에서 모듈을 로드한다거나 조건에 따라서 로드 할 수 없기때문에 Dynamic import를 위해 별도의 import 메소드를 사용하여야 합니다.

순환참조

---

### node.js에서 ES Modules를 사용하려면 어떻게 해야 할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

- node.js는 기본적으로 CJS로 동작 ESM을 원한다면 `pacakge.json` 에 `"type": "module"` 혹은 실행 파일 확장자를 `*.mjs`
- CJS 코드
  - CJS 모듈
    - require
  - ESM 모듈
    - import 메소드 IIFE
- ESM 코드
  - CJS 모듈
    - import
  - ESM 모듈
    - import

## Quest
* 스켈레톤 코드에는 다음과 같은 네 개의 패키지가 있으며, 용도는 다음과 같습니다:
  * `cjs-package`: CommonJS 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  * `esm-package`: ES Modules 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  * `cjs-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, CommonJS 기반의 프로젝트입니다.
  * `esm-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, ES Modules 기반의 프로젝트입니다.
* 각각의 패키지의 `package.json`과 `index.js` 또는 `index.mjs` 파일을 수정하여, 각각의 `*-my-project`들이 `*-package`에 노출된 함수와 클래스를 활용할 수 있도록 만들어 보세요.

## Advanced
### node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?

- [deno](https://deno.land/)
