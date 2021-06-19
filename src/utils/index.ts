import * as bcrypt from "bcrypt";
import _ = require("lodash");

export const hashSync = (data: string, saltRounds: number = 10) => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareHash = (hasHasy: string, newHasy: string) => {
  return bcrypt.compareSync(hasHasy, newHasy);
};

export const generateRefreshTokenKey = (email: string) => {
  if (_.isString(email) && !_.isUndefined(email))
    return `${email}_RefreshToken`;
};
