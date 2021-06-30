import * as os from "os";
import {
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";

export const _health = async (): Promise<object> => {
  try {
    const totalmem = os.totalmem();
    const freemem = os.freemem();
    const memPercent = (freemem / totalmem) * 100;
    const memoryLimit = 90;

    if (memPercent >= memoryLimit) {
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
