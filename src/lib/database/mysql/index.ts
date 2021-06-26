import * as _ from "lodash";
import { createConnection, getManager, Repository } from "typeorm";
import env from "../../../config";
import { mysqlConfig } from "../config";

import { User } from "../../../models/User/entity";
import { Contents } from "../../../models/Contents/entity";
import { sampleContents } from "./sample/contents";
import { sampleUsers } from "./sample/users";

export const generateTestData = (): void => {
  Promise.all([
    (() =>
      sampleUsers.forEach((item: any, idx: number) => {
        const user = new User();
        user.id = idx + 1;
        user.email = item.email;
        user.password = item.password;
        user.nickname = item.nickname;
        AppRepository.User.save(user);
      }))(),
    (() =>
      sampleContents.forEach((item: any, idx: number) => {
        const contents = new Contents();
        contents.id = idx + 1;
        contents.imageLink = item.imageLink;
        contents.title = item.title + idx;
        contents.subTitle = item.subTitle + idx;
        contents.description = item.description + idx;
        AppRepository.Contents.save(contents);
      }))(),
  ]).catch((e) => console.log("generateTestData Failed!!", e));
};

export const connectMysql = async (): Promise<void> => {
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

export const AppRepository: {
  User?: Repository<User>;
  Contents?: Repository<Contents>;
} = {};
export const connectRepository = async (): Promise<void> => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.User = getManager(env.node).getRepository(User);
    AppRepository.Contents = getManager(env.node).getRepository(Contents);
  }
};
