# Node Template

## 프로젝트 리팩토링

### Old Project = passport.js + redis + express template

### New Project = Api Server

## Framework & Library

```
Express
TypeORM
Mysql
Redis
JWT
```

## 작성자

```
2020.05.14 -> 2021.06.16
Author: 박현우
```

## [노트]

### 해야할 일

#### 컨텐츠 내려주기

#### redis (refreshToken) 붙이기

## 설명

```
[환경설정]
.env를 사용한다.

1. generate ./env file (dotenv)
2. DB Table (Model) 추가 시
    2-1. go .src/lib/database.ts
    2-2. connectRepository function에 참조되는 AppRepository 객체에 선언
```
