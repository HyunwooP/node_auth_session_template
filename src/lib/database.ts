import env from "../config";
import { getConnectionOptions, createConnection, getManager } from "typeorm";
import { User } from "../model/User/entity";
import * as _ from "lodash";

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

export const connectDB = async () => {
  const option = {
    ...(await getConnectionOptions(env.node)),
    password: env.mysqlPassword,
  };
  try {
    await createConnection(option);
  } catch (e) {
    console.log(`database Connect Failed!! ${e}`);
  }
};

export const AppRepository: any = {};
export const connectRepository = async () => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.User = getManager(env.node).getRepository(User);
  }
};
