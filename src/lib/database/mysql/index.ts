import * as _ from "lodash";
import { createConnection, getManager } from "typeorm";
import env from "../../../config";
import { mysqlConfig } from "../config";

import { User } from "../../../models/User/entity";

export const generateTestData = () => {
  const temp = [
    {
      email: "awakelife93@gmail.com",
      password: "123",
      nickname: "Harry",
    },
    {
      email: "bob@gmail.com",
      password: "123",
      nickname: "Bob",
    },
  ];
  const UserRepository = getManager(env.node).getRepository(User);
  temp.forEach((item: any, idx: number) => {
    const user = new User();
    user.id = idx + 1;
    user.email = item.email;
    user.password = item.password;
    user.nickname = item.nickname;
    UserRepository.save(user);
  });
};

export const connectMysql = async () => {
  const option: any = {
    ...mysqlConfig[env.node],
    password: env.mysqlPassword,
  };
  try {
    await createConnection(option);
  } catch (e) {
    console.log(`connectMysql Connect Failed!! ${e}`);
  }
};

export const AppRepository: any = {};
export const connectRepository = async () => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.User = getManager(env.node).getRepository(User);
  }
};
