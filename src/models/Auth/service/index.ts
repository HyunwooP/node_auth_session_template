import * as _ from "lodash";
import {
  findOneUser,
  createUser,
  findPayLoad,
} from "../../../models/User/service";
import { UserIE } from "../../User/entity";
import { compareHash, generateRefreshTokenKey } from "../../../utils";
import {
  createToken,
  Redis,
  onFailureHandler,
  CommonStatusCode,
  CommonStatusMessage,
  PayLoadIE,
} from "../../../lib";

export const _signIn = async (conditions: UserIE): Promise<UserIE> => {
  try {
    const user: UserIE = await findOneUser({
      email: conditions.email,
      isDeleted: false,
    });

    // DB 데이터 유효성 검사
    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 패스워드 검사
    if (!compareHash(conditions.password, user.password)) {
      onFailureHandler({
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      });
    }

    const refreshToken = createToken({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      jwtExpired: "3h",
    });

    // refreshToken 레디스 추가
    Redis.set(generateRefreshTokenKey(user.email), refreshToken);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      token: createToken({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const _signUp = async (conditions: UserIE): Promise<UserIE> => {
  try {
    let user: UserIE = await findOneUser({ email: conditions.email });

    // 동일한 계정 정보가 있다면
    if (!_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.DUPLICATE,
        message: CommonStatusMessage.DUPLICATE,
      });
    }

    user = await createUser(conditions);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      token: createToken({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const _signOut = async (token: string): Promise<object> => {
  try {
    const payload: PayLoadIE = await findPayLoad(token);

    if (_.isEmpty(payload.email)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    Redis.remove(generateRefreshTokenKey(payload.email));
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
