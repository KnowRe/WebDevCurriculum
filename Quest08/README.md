# Quest 08. 웹 API의 기초

## Introduction
* 이번 퀘스트에서는 웹 API 서버의 기초를 알아보겠습니다.

## Topics
* HTTP Method
* node.js `http` module
  * `req`와 `res` 객체

## Resources
* [MDN - Content-Type Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
* [MDN - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
* [MDN - MIME Type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)
* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
* [HTTP Node.js Manual & Documentation](https://nodejs.org/api/http.html)

## Checklist
### HTTP의 GET과 POST 메소드는 어떻게 다른가요?

- GET
  - 주로 데이터를 읽거나 검색하기 위해 설계
  - 캐싱 가능, 북마크 가능
  - 브라우저에 기록 남음
  - URL에 쿼리스트링으로 데이터 전송
  - URL의 최대 길이 존재
  - 멱등(idempotent) 같은 요청을 여러번 하더라도 항상 같은 응답
  - POST에 비해 보안에 약함
    - 데이터가 URL의 일부로 전송되고 그 때문에 브라우저 히스토리에 저장되며 서버가 플레인 텍스트로 로그를 남기기 때문

- POST
  - 주로 리소스를 생성/변경하기 위해 설계
  - 캐싱 불가능, 북마크 불가능
  - 브라우저에 기록 남지 않음
  - 멱등하지 않음
  - 데이터 길이 제한 없음
  - multipart/form-data or application/x-www-form-urlencoded Use multipart encoding for binary data.
  - GET에 비해 보안에 조금 더 안전
    - 파라미터들이 브라우저 히스토리나 서버 로그에 저장되지 않기 때문이다.

---

### 다른 HTTP 메소드에는 무엇이 있나요?

- PUT
  - 리소스의 전체 교체, 리소스 업데이트 시 모든 필드 필요
  - 멱등함
  - 캐싱 불가능
- PATCH
  - 리소스의 부분 교체, 리소스 업데이트 시 일부 필드 필요
  - 멱등하지 않음
  - 캐싱 가능
- DELETE
  - 특정 리소스를 삭제할 때 사용
  - 멱등함
  - 캐싱불가능
- OPTIONS
  - 웹서버에서 지원되는 메소드의 종류를 확인할 경우 사용
  - 멱등함
  - 캐싱 불가능
- HEAD
  - 웹서버 정보 확인, 헬스체크, 버전확인 등
  - 응답에 바디가 없음
  - 멱등함
  - 캐싱 가능
- CONNECT
  - 동적으로 터널 모드를 교환, 프록시 기능을 요청시 사용
  - 멱등하지 않음
  - 캐싱 불가능
- TRACE
  - 서버에 루프백 메세지 호출하기 위해, 통신 관리 및 디버깅 용도
  - 멱등하지 않음
  - 캐싱 가능

---

### HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?

- GET
  - 쿼리스트링
- POST
  - Body
  - Content-Type에 데이터 타입

---

### HTTP 요청의 `Content-Type` 헤더는 무엇인가요?

- 리소스 컨텐츠의 타입을 명시하기 위해
- 컨텐츠의 데이터가 어떤 종류의 데이터인지 알려주기 위해

```json
ex:

Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

---

### Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?

- form-data
  - ASCII가 아닌 텍스트나 큰 이진 데이터를 전송해야 하는 경우에는 폼 데이터를 전송할 때
- x-www-form-urlencoded
  - 단순 텍스트,아스키 데이터를 전송할 때
  - 키=밸류 쌍으로 인코딩 (영어 알파벳이 아닌문자들은 percent encoded로 인코딩
- raw
  - 원본 문자열 데이터를 수정없이 그대로 전송
  - 드롭다운으로 Content-Type 설정 가능
- binary
  - 비디오/오디오/이미지 혹은 기타 파일 처럼 비텍스트(non-textual) 데이터를 첨부할때

---

### node.js의 `http` 모듈을 통해 HTTP 요청을 처리할 때,

### `req`와 `res` 객체에는 어떤 정보가 담겨있을까요?

#### **req (IncomingMessage)**

- url
  - Returns the request URL string
- method
  - Returns the request method
- statusCode
  - Returns the HTTP response status code
- httpVersion
  - Returns the HTTP version sent by the client
- rawHeaders
  - Returns an array of the request headers
- rawTrailers
  - Returns an array of the raw request trailer keys and values
- setTimeout()
  - Calls a specified function after a specified number of milliseconds
- socket
  - Returns the Socket object for the connection
- trailers
  - Returns an object containing the trailers

#### res (ServerResponse)

- end()
  - Signals that the the server should consider that the response is complete
- statusCode
  - Sets the status code that will be sent to the client
- finished
  - Returns true if the response is complete, otherwise false
- write()
  - Sends text, or a text stream, to the client
- setHeader()
  - Sets the specified header
- getHeader()
  - Returns the value of the specified header
- headersSent
  - Returns true if headers were sent, otherwise false
- removeHeader()
  - Removes the specified header
- sendDate
  - Set to false if the Date header should not be sent in the response. Default true
- setTimeout
  - Sets the timeout value of the socket to the specified number of milliseconds
- statusMessage
  - Sets the status message that will be sent to the client
- writeContinue()
  - Sends a HTTP Continue message to the client
- writeHead()
  - Sends status and response headers to the client

### GET과 POST에 대한 처리 형태가 달라지는 이유는 무엇인가요?

- 설계된 목적이 다르다.
- GET은 쿼리스트링으로 URL 주소끝에 데이터가 추가되어 전송하고
- POST는 body에 추가되어 전송

---

### 만약 API 엔드포인트(URL)가 아주 많다고 한다면, HTTP POST 요청의 `Content-Type` 헤더에 따라 다른 방식으로 동작하는 서버를 어떻게 정리하면 좋을까요?

- Content-Type에 따라 다른 동작을 하는 파서를 만든다

---

### 그 밖에 서버가 요청들에 따라 공통적으로 처리하는 일에는 무엇이 있을까요? 이를 어떻게 정리하면 좋을까요?

- 라우터
- 각종 파서
- 에러 핸들러
- 로거
- 인증

## Quest
* 다음의 동작을 하는 서버를 만들어 보세요.
  * 브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력합니다.
  * 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  * 서버의 `/foo` URL에 `bar` 키에 임의의 문자열 값을 갖는 JSON 객체를 POST 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  * 서버의 `/pic/upload` URL에 그림 파일을 POST 하면 서버에 보안상 적절한 방법으로 파일이 업로드 됩니다.
  * 서버의 `/pic/show` URL을 GET 하면 브라우저에 위에 업로드한 그림이 뜹니다.
  * 서버의 `/pic/download` URL을 GET 하면 브라우저에 위에 업로드한 그림이 `pic.jpg`라는 이름으로 다운로드 됩니다.
* expressJS와 같은 외부 프레임워크를 사용하지 않고, node.js의 기본 모듈만을 사용해서 만들어 보세요.
* 처리하는 요청의 종류에 따라 공통적으로 나타나는 코드를 정리해 보세요.

## Advanced
### 서버가 파일 업로드를 지원할 때 보안상 주의할 점에는 무엇이 있을까요?

- 파일 확장자 검사
- 파일 이름 특수문자 금지
- 업로드된 파일에 직접 접근 및 실행이 불가능 하게
