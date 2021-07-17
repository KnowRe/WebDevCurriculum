# Quest 05. OOP 특훈

## Introduction
* 이번 퀘스트에서는 바닐라 자바스크립트의 객체지향 프로그래밍을 조금 더 훈련해 보겠습니다.

## Topics
* Separation of Concerns
* 객체지향의 설계 원칙n
  * SOLID 원칙
* Local Storage

## Resources
* [Separation of concerns](https://jonbellah.com/articles/separation-of-concerns/)
* [SOLID](https://en.wikipedia.org/wiki/SOLID)
* [객체지향 설계 5원칙](https://webdoli.tistory.com/210)
* [MDN - Local Storage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

## Checklist
### 관심사의 분리 원칙이란 무엇인가요? 웹에서는 이러한 원칙이 어떻게 적용되나요?

Separation of Concerns, SoC

특정 집합과 영역을 구별된 부분으로 분리시키는 디자인 원칙 입니다. 각 영역이 모듈의 역할을 하여 다른 영역에 영향을 주지 않고 특정 영역의 변경을 가능하게 합니다. 변경이 지역화가 되어 문제 식별, 디버깅 혹은 코드 재사용성에 도움을 줍니다.

웹에서는 대표적으로 HTML, CSS, Javascript의 분리 혹은 MVC, MVVM 패턴에서의 분리가 있습니다.

---

### 객체지향의 SOLID 원칙이란 무엇인가요? 이 원칙을 구체적인 예를 들어 설명할 수 있나요?

#### 1. Single Responsiblity Principle (단일 책임 원칙)

하나의 모듈은 오직 하나의 액터에 의해서만 책임져야 함

```typescript
/*
	bad
*/

class User {
  private db: Database;
  private name: string;
  private birth: Date;
  constructor(name: string, birth: Date) {
    this.db = Database.connect();
  }
  getUser() {
    return `${this.name}(${this.birth})`;
  }
  save() {
    this.db.users.save({ name: this.name, birth: this.birth });
  }
}
```

```typescript
/*
	good
*/

class User {
  constructor(private name: string, private birth: Date) {}
  getUser() {
    return `${this.name}(${this.birth})`;
  }
}

class UserRepository {
  private db: Database;
  constructor() {
    this.db = Database.connect();
  }
  save(user: User) {
    this.db.users.save(JSON.stringify(user));
  }
}
```

#### 2. Open-Closed Principle (개방-패쇄 원칙)

확장에는 열려있고 수정에는 닫혀있는. 기존의 코드를 변경하지 않으면서( Closed), 기능을 추가할 수 있도록(Open) 설계가 되어야 한다는 원칙을 말함. 기능추가, 변경이 될때 기존 코드가 수정되면 안됨.

```typescript
class CreditCard {
  private readonly _code: string;
  protected readonly _sum: number;
  constructor(code: string, sum: number) {
    this._code = code;
    this._sum = sum;
  }
  get code() {
    return this._code;
  }
  //default
  getDiscountedSum() {
    return this._sum * 0.9;
  }
}
```

```jsx
class GoldCreditCard extends CreditCard {
  // overriding
  getDiscountedSum(): number {
    return this._sum * 0.6;
  }
}
```

```jsx
class SilverCreditCard extends CreditCard {
  // overriding
  getDiscountedSum(): number {
    return this._sum * 0.8;
  }
}

//다른 할인률을 갖는 새로운 카드가 추가되어도 기존 코드는 수정하지 않아도 됨
```

#### 3. Liskov Substitution Principle (리스코프 치환 원칙)

자식 클래스는 언제나 자신의 부모 클래스를 대체할 수 있다는 원칙. 즉 부모 클래스가 들어갈 자리에 자식 클래스를 넣어도 계획대로 잘 작동해야함

```typescript
class Phone {
  call() {
    console.log('call');
  }
}

class Iphone extends Phone {
  apple() {
    console.log('apple');
  }
}
class GalaxyPhone extends Phone {
  samsung() {
    console.log('samsung');
  }
}

const iphone = new Iphone();
const galaxy = new GalaxyPhone();

console.log(iphone instanceof Iphone); //true
console.log(galaxy instanceof GalaxyPhone); //true

console.log(iphone instanceof Phone); //true
console.log(galaxy instanceof Phone); //true

const calling = (phone: Phone): void => {
  phone.call();
};
calling(iphone);
calling(galaxy);
```

#### 4. Interface Segregation Principle (인터페이스 분리 원칙)

한 클래스는 자신이 사용하지않는 인터페이스는 구현하지 말아야 함. 하나의 일반적인 인터페이스보다 여러개의 구체적인 인터페이스가 나음. 클라이언트는 사용하지 않는 인터페이스에 의존하게 강요받으면 안 됨

```typescript
/*
	bad
*/

interface Printer {
  print(): void;
  copy(): void;
}

class SimplePrinter implements Printer {
  print(): void {
    console.log('print!');
  }

  copy(): void {}
}

class AwesomePrinter implements Printer {
  print(): void {
    console.log('print!');
  }

  copy(): void {
    console.log('copy!');
  }
}
```

```typescript
/*
	good
*/

interface Printer {
  print(): void;
}

interface Copier {
  copy(): void;
}

class SimplePrinter implements Printer {
  print(): void {
    console.log('print!');
  }
}

class AwesomePrinter implements Printer, Copier {
  copy(): void {
    console.log('copy!');
  }

  print(): void {
    console.log('print!');
  }
}
```

#### 5. Dependency Inversion Principle (의존 역전 원칙)

의존 관계를 맺을 때 변화하기 쉬운 것 또는 자주 변화하는 것보다는 변화하기 어려운 것, 거의 변화가 없는 것에 의존하라는 것. 한마디로 구체적인 클래스보다 인터페이스나 추상 클래스와 관계를 맺으라는 것.

```typescript
interface Door {
  open(): void;
  close(): void;
}

class MyDoor implements Door {
  open(): void {
    console.log('open my door');
  }
  close(): void {
    console.log('close my door');
  }
}

// 구체적인 특정 클래스가 아니라 상대적으로 변화하기 어려운 인터페이스와 의존 관계를 맺는다.
// MyDoor X => Door O 
class DoorController {
  private door: Door;
  private isOpened = false;

  constructor(door: Door) {
    this.door = door;
  }

  toggle() {
    if (this.isOpened) {
      this.door.close();
      this.isOpened = false;
    } else {
      this.door.open();
      this.isOpened = true;
    }
  }
}
```

---

### 로컬 스토리지란 무엇인가요? 로컬 스토리지의 내용을 개발자 도구를 이용해 확인하려면 어떻게 해야 할까요?

HTML5에는 데이터를 클라이언트에 저장할 수 있는 web storage 스펙이 포함되어있다.

#### Local Storage와 Session Storage

- 기본적으로 도메인 단위(주소)로 접근됨
- A도메인에서 저장한 데이터는 B데이터에서 접근 불가
- 클라이언트에서 얼마든지 임의수정 가능

#### Local Storage

- 로컬에 데이터가 보관, 브라우저를 종료하고 다시 접속해도 그 데이터를 사용할 수 있음

#### Session Storage

- 현재 페이지가 브라우징 되고있는 브라우저 컨텍스트 내에서만 유지가능
- 따라서 같은 도메인이여도 컨텍스트가 다르면 (새로운 탭에서 같은 도메인에 접속한다던지) 접근할 수 없다.

크로미윰 기반의 경우 `Application` 탭에서 확인 가능

---


## Quest
* 외부 라이브러리나 프레임워크를 사용하지 않고, 자바스크립트를 이용하여 간단한 웹브라우저 기반의 텍스트 에디터를 만들어 보겠습니다.
  * 기본적으로 VSCode와 같이 탭을 이용해 여러 개의 파일을 동시에 편집할 수 있습니다.
  * 탭을 눌러 열려 있는 다른 파일을 편집할 수 있으며 탭을 언제든지 닫을 수 있습니다.
  * VSCode와 같이 새 파일, 로드, 저장, 다른 이름으로 저장 등의 기능을 가집니다. 저장은 웹 브라우저의 로컬 스토리지를 이용합니다.
  * VSCode와 같이 탭이 수정되었는데 저장되기 이전일 경우 이를 알려주는 인디케이터가 작동합니다.
  * 같은 이름의 파일을 저장할 경우 에러를 표시해야 합니다.
* 이번 퀘스트의 결과물은 앞으로의 많은 퀘스트에서 재사용되게 되니, 주의깊게 코드를 작성해 보세요!

## Advanced

### 웹 프론트엔드 개발에서 이러한 방식의 패턴을 더 일반화해서 정리할 수 있을까요? 이 퀘스트에서 각각의 클래스들이 공통적으로 수행하게 되는 일들에는 무엇이 있을까요?

프론트엔드 개발을 큰 흐름으로 보자면

- 데이터 혹은 데이터의 변경을 기반으로 요소들을 렌더링
- 이벤트로부터 발생하는 특정 동작 혹은 데이터의 변경

이라는 생각이 들었습니다. 또한 그러한 코드들을 더욱 체계적이고 유지보수 및 확장이 쉽게 도와주기 위해 상황에 맞는 아키텍쳐 패턴과 디자인 패턴의 적용 혹은 프레임워크가 존재 한다고 생각합니다.

퀘스트에서 렌더러의 렌더 함수가 데이터 변경이 있을때 마다 호출되는데 옵저버 패턴으로 바인딩하여 state의 변경을 감지하여 렌더링 되면 좋을것 같다는 생각이 들었습니다.
