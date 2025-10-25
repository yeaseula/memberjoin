# 회원가입 모듈 (Sign-up Module)

사용자 입력 검증 및 상태 관리가 가능한 **회원가입 전용 모듈**입니다.  
필수 입력 필드 확인, 중복검사, 비밀번호 유효성 검사 등 전 과정을 자동화합니다.
프로젝트를 위해 만들었지만, 추후 다른 곳에도 기능을 사용할 수 있도록 모듈화 작업했습니다.

## 실행 방법
하단 링크를 클릭하면 접속 가능합니다.
[github 배포주소](https://yeaseula.github.io/memberjoin/)

## 시연 영상
![회원가입 전체영상 (1)](https://github.com/user-attachments/assets/4ea8c488-64b9-44e9-9f1e-a9538fe4b079)


## 주요 기능

### 1. 입력 순서 및 필수 입력 체크
- 상단 **아이디**부터 순서대로 입력해야 함.  
- 상단 input이 비어 있는 상태에서 하단 input에 입력할 경우 상단 input에 `"필수 정보입니다"` 오류 메시지 출력.  
- 모든 필드 작성 완료 + 유효성 검사 통과 + 체크박스 동의 시  **가입하기 버튼 활성화.**

### 2. 아이디 유효성 및 중복확인
- `아이디` 입력창 **포커스 해제 시 자동 유효성 검사** 진행.  
- **[중복확인] 버튼 클릭 시** → 유효성 검사 + 중복확인 API 호출 병행.

### 3. 비밀번호 유효성 검사
- `비밀번호` 입력 후 포커스 해제 시 즉시 검사 수행.  
- 비밀번호 확인 필드와 일치 여부를 상태 객체로 관리.

---

## 구현 포인트

### 1. 필드 자동 생성 & 필수 입력 제어
객체 설정만으로 필드 생성 및 필수 여부 지정 가능.

```js
id: {
  istrue: true,              // 필드 사용 여부
  requeire: true,            // 필수 입력 여부
  containerClass: 'buyer-id-container',
  tag: '아이디',
  fieldType: 'text',
  fieldName: 'buyer-user-id',
  maxlength: 10
}
```
requeire: false 일 경우 필수입력 필드에서 자동 제외됩니다.

```js
if (requeire) {
  input.setAttribute('required', true);
}
```

class 내부 필드 생성 관련 메서드에서 필수입력 필드가 생성됩니다.


### 2. 상태관리 객체로 로직 단순화

입력/검사 상태를 한 곳에서 관리하는 joinState 사용

```js
const joinState = {
  userType: targetInput.value || 'buyer',
  isIdChecked: false,     // 아이디 중복확인 완료 여부
  isPassMatch: false,     // 비밀번호 일치 여부
  isAllField: false,      // 필수 입력 필드 작성 완료 여부
  isAgree: false,         // 약관 동의 여부
  isSellerNumber: false,  // 판매자 등록번호 입력 여부
};
```

- 각 이벤트(입력, 포커스 해제, 버튼 클릭 등)에서 해당 상태를 갱신.
- 모든 값이 true일 때 가입하기 버튼 자동 활성화.


## 작업 예정

typescript로 리팩토링 예정입니다.



