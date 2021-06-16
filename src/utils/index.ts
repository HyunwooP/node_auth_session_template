import * as bcrypt from "bcrypt";

export const hashSync = (data: string, saltRounds: number = 10) => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareHash = (hasHasy: string, newHasy: string) => {
  return bcrypt.compareSync(hasHasy, newHasy);
};
