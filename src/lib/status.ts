export enum CommonStatusCode {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  OK = 200,
  BAD_REQUEST = 400,
  DUPLICATE = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum CommonStatusMessage {
  UNAUTHORIZED = "UNAUTHORIZED", // 인증 실패
  NOT_FOUND = "NOT_FOUND", // 리소스 및 데이터 없음
  OK = "OK", // 정상 처리
  BAD_REQUEST = "BAD_REQUEST", // 잘못된 요청
  DUPLICATE = "DUPLICATE", // 리소스 및 데이터 중복
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // 기타 예외 처리
}
