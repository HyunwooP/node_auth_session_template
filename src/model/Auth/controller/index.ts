import { _signIn, _signUp } from "../service";

export const signIn = async (req: any, res: any, next: Function) => {
  return await _signIn({ email: req.body.email, password: req.body.password });
};

export const signUp = async (req: any, res: any, next: any) => {
  return await _signUp({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  });
};
