# [CSS 우선순위](https://www.juicylog.com/css-specificity)

## CSS를 HTML에 적용하는 방법

![img.png](.images/img_3.png)

### 인라인 스타일

```html
<p style="color:red; background-color:yellow;">foo</p>
```

HTML의 스타일 속성으로 css코드를 삽입합니다.

### 내부 스타일시트

```html
<p class="content">foo</p>
...
<style>
.content {
    color: red;
}
</style>
```


HTML문서 안에 스타일 코드를 작성합니다.

### 외부 스타일시트

HTML의 스타일 속성으로 css코드를 삽입합니다.

```css
/* style.css */
.content {
    color: red;
}

<link rel="stylesheet" type="text/css" href="style.css">
or
<style type="text/css">
    @import url("mystyle.css");
</stlye>
```



외부에 css파일을 작성하고 HTML문서에서 불러옵니다.

### 세 가지 방법 각각의 장단점은 무엇일까요?

- **인라인 스타일:** 간단한 스타일의 경우 직관적일 수 있으나, 스타일 코드가 복잡하면 가독성이 떨어지고 재사용이 불가능 합니다. 또한 인라인 스타일은 높은 우선순위를 갖기 때문에 일관된 스타일 적용을 방해할 수 있습니다.
- **내부 스타일시트:** 하나의 HTML문서에서 여러 요소들에 스타일을 적용할 수 있으나, 다른 문서에서 적용할 수 없습니다.
- **외부 스타일시트:** 하나의 스타일시트를 여러 문서에서 재사용 할 수 있습니다. 디팬던시가 생기고 복잡해지면 추적이 어려울 수 있습니다.

## 다중 스타일 시트

브라우저는 우리가 작성한 css 파일 뿐만아니라 브라우저의 디폴트 스타일, 인라인 스타일, 브라우저에서 넣을 수 있는 스타일 등 여러 소스로 부터의 스타일들을 스타일시트로 관리합니다.

> 브라우저 개발자 콘솔에 `document.styleSheets` 를 입력해봅시다.

## CSS의 우선순위

CSS의 스타일은 어떤 우선순위로 동작할까요? 일단 가장 기본적인 룰은 다음과 같습니다.

- 범위가 작을수록 (구체적이고 한정적 일수록) 우선순위가 높다.
- 같은 우선순위라면 뒤에 오는 규칙이 우선순위가 높다.
- !important를 우선한다.
- 우선순위는 스타일 시트나, 선택자를 포함하는 모든 속성이 아니라 각 프로퍼티를 읽는 (마치 오버라이딩) 순서라고 생각하자.

내부적으로는 우선 매칭 되는 모든 스타일들을 찾고 우선순위로 정렬을 합니다. 그리고 선택자의 계산된 가중치로 정렬을하고 가중치 및 출처, 우선순위가 같으면 나중에 선언된것이 우선순위를 높게 생각합니다.

### 스타일시트 우선순위

- user style sheets: 브라우저에서 폰트 사이즈를 키운다거나, 플러그인을 이용한다거나등 브라우저에서 사용자가 설정하는 스타일시트
- author style sheets: 개발자가 작성한 스타일시트
- user agent style sheets: 브라우저의 디폴트 스타일시트

1. user important declarations (!important)
2. author important declarations (!important)
3. author normal declarations
4. user normal declarations
5. user agent

### 선택자 우선순위

우리는 여러가지 형태의 셀렉터로 동일한 엘리먼트를 가리킬수 있습니다. 예를들어 `<div id="id" class="class">` 와 같은 엘리먼트가 있다면 id로도 접근이가능하고 클래스네임으로도 접근이 가능합니다. 같은 엘리먼트를 보고 있지만 다른 셀렉터를 사용하는 경우 우선순위는 어떻게 될까요?

<p class="codepen" data-height="482" data-theme-id="dark" data-default-tab="css,result" data-user="juicyjusung" data-slug-hash="mdWjLQr" style="height: 482px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="mdWjLQr">
  <span>See the <a href="https://codepen.io/juicyjusung/pen/mdWjLQr">
  code</a> by JuicyJusung (<a href="https://codepen.io/juicyjusung">@juicyjusung</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

1. 속성 값 뒤에 `!important` 를 붙인 속성
2. 인라인 스타일
3. `#id` 아이디 선택자
4. 클래스/속성/가상 선택자
5. 태그 엘리먼트 선택자

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="juicyjusung" data-slug-hash="ZEejaMy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css-selector-spec">
  <span>See the <a href="https://codepen.io/juicyjusung/pen/ZEejaMy">
  code</a> by JuicyJusung (<a href="https://codepen.io/juicyjusung">@juicyjusung</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

많은 글들에서 각 선택자 그룹에 스코어(1000, 100, 10, 1)를 계산하고 더해서 우선순위를 정한다고 설명하는데 반은 맞고 반은 틀린 설명 입니다. 내부적으로는 각 그룹의 출현 개수 중 가장 큰 개수의 진법으로 계산하여 하위 그룹이 아무리 높아도 상위 그룹을 이길 수 없습니다. 예를들어 클래스선택자가 100개가 있어도 id 선택자 보다 우선순위가 낮습니다. (실제 이렇게 까지 선택자를 쓰는 경우는 없겠지만요)

