import { _signIn, _signOut } from "../service";

export const signIn = async (req: any, res: any, next: Function) => {
  return await _signIn({ email: req.body.email, password: req.body.password });
};

export const signOut = async (req: any, res: any, next: any) => {
  return await _signOut(req, res);
};
