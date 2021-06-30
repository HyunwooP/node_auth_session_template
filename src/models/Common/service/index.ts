import {
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";

export const _health = async (): Promise<object> => {
  try {
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
