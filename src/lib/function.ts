import * as _ from "lodash";
import { StatusCode, StatusMessage } from "./status";

export const onSuccessHandler = ({
  status = StatusCode.OK,
  message = StatusMessage.OK,
  data,
}: {
  status?: number;
  message?: string;
  data?: any;
}) => {
  return {
    status,
    message,
    data,
  };
};

export const onFailureHandler = ({
  status,
  message,
  data,
}: {
  status: number;
  message: string;
  data?: any;
}) => {
  throw {
    status,
    message,
    data,
  };
};
