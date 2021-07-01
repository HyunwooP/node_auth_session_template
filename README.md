# Node Template

## React + Node API Server + Style Server

## Client Repository

https://github.com/HyunwooP/react_template

## Style Server Repository

https://github.com/HyunwooP/node_design_style

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

## 설명

```
[환경설정]
.env를 사용한다.

1. generate ./env file (dotenv)
2. DB Table (Model) 추가 시
    2-1. go .src/lib/database.ts
    2-2. connectRepository function에 참조되는 AppRepository 객체에 선언
```

## 실행

```
1. npm i
2. npm start
  2-1. 현재 개발중으로 인해 nodemon을 붙인 상태이므로, package.json 수정해서 사용하길 요망
3. 설명란 참고
```
