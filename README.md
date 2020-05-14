## passport.js + redis + express template
```
2020.05.14
Author: 박현우
```

# 레디스를 사용하여 세션을 관리하자.
* 인증은 passport에게

1. 
```
[노트]

인증과 세션 관리에 대한 템플릿을 만들고 싶어서 개발했기 때문에,
따로 DB Connection을 하지 않았다.

인증처리에 대해서는 DB를 붙여서, 로그인 프로세스를 따로 맞게 구현 해야한다.

또한, passport.js에서도 DB에서 직접 가져와서 데이터를 검증하고 callback 처리해야 하기 때문에,
passport.js - deserializeUser, strategy를 수정하자.

[환경설정]
.env를 사용한다.

.env params list

port = 3000
redisPort = 6379
redisHost = '127.0.0.1'
sessionSecret = 'anything'

[프로젝트 구조]

{
  root: index.js
  lib: {
    env: .env의 데이터와 대조하여 기본 값 설정
    express: 기본적인 Express 미들웨어 설정
    init: 프로세스 root
    login: 로그인 구현해야할 곳
    passport: passport.js 설정
  }
}
```