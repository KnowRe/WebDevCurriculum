### 자동화된 테스트를 만드는 것에는 어떤 장점과 단점이 있을까요?
 
 * 장점1: 테스트 수행 시간을 비약적으로 감소시킨다.
 * 장점2: 테스트 코드로 일관된 테스트가 가능하다. (수동 테스트는 일관성 확보가 100% 보장되지 않는다.)

 * 단점1: 자동화 테스트는 이미 존재할 가능성이 있다고 생각되는 버그를 점검하지만, 수동 테스트는  모르는 버그를 찾아낼 수 있다.


### TDD(Test-Driven Development)란 무엇인가요? TDD의 장점과 단점은 무엇일까요?

  1. TDD는 Test-Driven Development의 줄임말로 테스트 주도형 개발 방법론이다. 일반적인 개발 플로우는 설계->코드작성->테스트 순으로 진행된다. 반면, TDD는 설계->테스트코드작성=>코드작성 순으로, 테스트 코드 단계에서 테스트를 통과한 코드를 토대로 실제 개발에 들어간다. 따라서 설계단계에서 미리 어떤 테스트를 진행할 건지 정의해야할 필요가 있다.

  2. TDD 장점: 이미 테스트를 통과한 코드를 토대로 리팩토링을 하기 때문에 코드의 품질이 향상된다. 또한 설계단계에서 이미 코드에 대한 이해가 필요하게 되므로 보다 상세한 설계가 가능하며, 설계에 대한 추가, 수정이 쉽다.

  3. TDD 단점: 가장 큰 단점으로 개발 생산성이 낮아진다. 본격적인 개발을 하기 전에 테스트 코드를 작성하여 테스트를 진행하므로 익숙하지 않은 개발자라면 성과물을 보여주는데 시간이 걸릴것이다. 

### 테스트들 간의 계층에 따라 어떤 단계들이 있을까요?

  * 단위 테스트, 통합 테스트, End to End 테스트 등이 있다.

### 유닛 테스트, 통합 테스트, E2E 테스트는 각각 어떤 것을 뜻하나요?

  * 유닛 테스트: 모든 모듈에 각각의 테스트 케이스를 작성하여, 기능 단위로 테스트를 수행하는 것을 말한다.

  * 통합 테스트: 각 모듈을 통합하여 모듈간의 상호작용을 검증하는 테스트이다. 모듈을 한번에 모두 통합하여 테스트하는 빅뱅 통합 방법, 점진적으로 각 모듈을 통합하는 하향식, 상향식 테스트 방법이 있다.

  * E2E 테스트: 전체 시스템이 제대로 작동하는지 확인하는 테스트로 Mock이나 Stub과 같은 테스트 더블을 사용하지 않으며 최대한 실제 시스템을 사용하는 사용자 관점에서 테스트 하는 것이다.

### 테스트에 있어서 Stub과 Mock은 어떤 개념을 가리키는 것일까요?

  * Mock: 테스트에서 실제 오브젝트처럼 행동하는 가짜 오브젝트를 가리키다. 또한 해당 가짜 오브젝트의 행위를 테스트한다.

  * Stub: 테스트에서 canned answer를 호출한 쪽에 제공하는 역할을 하는 오브젝트이다. canned answer에 의한 호출 결과 즉 상태를 테스트하는데 사용된다.

### Jest는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

  * jest는 자바스크립트 코드를 테스트하는 테스트 프레임워크다. 특정 클래스, 메소드, 함수가 어떻게 동작하는지를 예측하여 그 결과 값을 비교하는 것으로 테스트가 진행되기 때문에, mocking을 통한 테스트가 편하도록 구성되어있다. 기본적인 사용법은 아래와 같다.
  ``` js
  function sum(a, b) {
    return a + b;
  }
  
  test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
  });
  ```

### Jest 이외의 테스트 프레임워크는 어떤 것이 있고 어떤 장단점이 있을까요?

  1. QUnit  
   단점: 설정이 어렵고, 계속해서 수정이 필요하다. 비동기 코드의 테스트가 어렵다. 헤드리스 브라우저를 지원하지 않는다. 스냅샷 테스트를 지원하지 않는다.

  2. Mocha  
   장점: 다른 라이브러라를 추가하여 유연하게 사용하는 것이 가능하다. 비동기 코드의 테스트를 지원한다. 자바스트립트 커뮤니티에서 더 대중적이다.   
   단점: 스냅샷 테스트를 지원하지 않는다.

### Puppeteer는 어떤 일을 하며 어떻게 사용하는 테스트 프레임워크일까요?

  * Puppeteer는 Node.js 기반 크롬용 헤드리스 브라우저 테스트 프레임워크다. 브라우저에서 수동으로 할 수 있는 작업을 Puppeteer는 코드로 진행할 수 있게 해준다. 스크린샷을 찍거나 각종 이벤트를 테스트하기에 좋다.
  사용법은 아래와 같아.
  ``` js
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com',   {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});
  
    await browser.close();
  })();
  ```