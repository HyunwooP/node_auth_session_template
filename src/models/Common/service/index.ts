import { healthCheckMemory } from "../../../utils";
import {
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";

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
