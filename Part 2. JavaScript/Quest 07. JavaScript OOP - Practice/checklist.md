# Question

- 더 좋은 코드를 만들려면 어떻게 해야 할까요?
- 더 좋은 코드는 끊임없이 바뀌는 요구사항들에 겪는 고통을 최소한으로 줄일 수 있는 코드입니다.
    - 만약 완성된 코드에서 두 개의 데스크탑을 따로 두어 실행되도록 하려면 어떻게 해야 할까요?
    - 만약 시작할 때 주어지는 세팅(한 개의 일반 아이콘, 두 개의 폴더 아이콘)을 자유롭게 바꾸고 싶다면 어떻게 해야 할까요?
    - 아이콘의 모양과 크기가 언제든지 바뀔 수 있다면 어떻게 해야 할까요?

# Answers

> 더 좋은 코드를 만들려면 어떻게 해야 할까요?

더 좋은 코드를 만들기 위해서는 기본적으로 좋은 설계가 바탕이 되어야 합니다.

좋은 설계라는 것은 추후 요구사항 수정이나 확장이 발생했을때 최소한의 인력을 사용하여 요구사항을 반영할 수 있는 것입니다 즉, 변경에 잘 대응할 수 있는 설계를 해야 합니다.

또한 `Claen Code` 의 기준을 지키며 코딩하면 본인 이외에 다른사람이 내 코드를 볼때도 좋은 효과를 가져올 수 있습니다.

## 클린 코드

클린코드는 가독성이 높은 코드를 말합니다.

- 네이밍이 잘 되어야 함
- 오류가 없어야 함
- 중복이 없어야 함
- 의존성을 최대한 줄여야 함
- 클래스 혹은 메서드가 한가지 일만 처리해야 함