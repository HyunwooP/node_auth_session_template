import { healthCheckMemory } from "../../../utils";
import {
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { findUser } from "../../../models/User/service";
import { findContentsCount } from "../../../models/Contents/service";

export const _health = async (): Promise<object> => {
  try {
    if (healthCheckMemory() === true) {
      onFailureHandler({
        status: CommonStatusCode.INTERNAL_SERVER_ERROR,
        message: `현재 메모리 점유율이 90% 이상입니다. - ${new Date().toISOString()}`,
      });
    }

    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const _findDashboardCount = async (): Promise<object> => {
  try {
    const users = await findUser({});
    const client = users
      .map((user) => {
        return (
          true ===
          user.userRoles.some((userRole) => {
            return userRole.role.roleName === "사용자";
          })
        );
      })
      .filter((bool: boolean) => bool);

    const admin = users
      .map((user) => {
        return (
          true ===
          user.userRoles.some((userRole) => {
            return userRole.role.roleName === "관리자";
          })
        );
      })
      .filter((bool: boolean) => bool);

    const contents = await findContentsCount();

    return {
      usersCount: {
        total: users.length,
        client: client.length,
        admin: admin.length,
      },
      contentsCount: {
        total: contents,
      },
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
