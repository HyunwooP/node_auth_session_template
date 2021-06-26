import * as bcrypt from "bcrypt";
import * as _ from "lodash";

export const hashSync = (data: string, saltRounds: number = 10): string => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareHash = (hasHasy: string, newHasy: string): boolean => {
  return bcrypt.compareSync(hasHasy, newHasy);
};

export const generateRefreshTokenKey = (email: string): string => {
  if (_.isString(email) && !_.isUndefined(email))
    return `${email}_RefreshToken`;
};
