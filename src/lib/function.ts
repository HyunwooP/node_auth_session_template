import * as _ from "lodash";

export const onFailureHandler = ({
  status,
  message,
  data,
}: {
  status: number;
  message: string;
  data?: any;
}): {
  status: number;
  message: string;
  data?: any;
} => {
  throw {
    status,
    message,
    data,
  };
};
