import env from "../config/env";
import { User } from "../entity/User";
import { getConnectionOptions, createConnection, getManager } from "typeorm";

export const generateTestData = () => {
  const temp = [
    {
      email: "awakelife931@gmail.com",
      password: "123",
      nickname: "Harry",
    },
    {
      email: "awakelife932@gmail.com",
      password: "123",
      nickname: "Bob",
    },
  ];

  const getRepository = getManager(env.node).getRepository(User);
  temp.forEach((item: any, idx: number) => {
    const user = new User();
    user.id = idx + 1;
    user.email = item.email;
    user.password = item.password;
    user.nickname = item.nickname;
    getRepository.save(user);
  });
};

export const getRepository = (entity: any) => {
  return getManager(env.node).getRepository(entity);
};

export default async () => {
  const option = await getConnectionOptions(env.node);
  try {
    await createConnection({
      ...option,
    });
  } catch (e) {
    console.log(`Mysql Connect Failed!! ${e}`);
  }
};
