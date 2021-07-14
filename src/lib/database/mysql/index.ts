import * as _ from "lodash";
import { createConnection, getManager, Repository } from "typeorm";
import env from "../../../config";
import { mysqlConfig } from "../config";

import { User, UserIE } from "../../../models/User/entity";
import { Contents, ContentsIE } from "../../../models/Contents/entity";
import { Role, RoleIE } from "../../../models/Role/entity";
import { UserRole } from "../../../models/User/entity/UserRole";

import { sampleContents } from "./sample/contents";
import { sampleUsers } from "./sample/users";
import { sampleRoles } from "./sample/role";

export const generateTestData = (): void => {
  Promise.all([
    // Role Table 생성
    (() =>
      sampleRoles.forEach((item: RoleIE, idx: number) => {
        const role = new Role();
        role.name = item.name;
        AppRepository.Role.save(role);
      }))(),
    (() =>
      // User Table 생성
      sampleUsers.forEach((item: UserIE, idx: number) => {
        const user = new User();
        user.email = item.email + idx;
        user.password = item.password;
        user.nickname = item.nickname + idx;
        AppRepository.User.save(user);
      }))(),
    (() =>
      // Relation User Role Table 생성
      sampleUsers.forEach((item: UserIE, idx: number) => {
        const userRole = new UserRole();
        if (idx % 2 === 0) {
          userRole.role = 1;
        } else {
          userRole.role = 2;
        }
        userRole.user = idx + 1;
        AppRepository.UserRole.save(userRole);
      }))(),
    // Content Table 생성
    (() =>
      sampleContents.forEach((item: ContentsIE, idx: number) => {
        const contents = new Contents();
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
  Role?: Repository<Role>;
  UserRole?: Repository<UserRole>;
} = {};
export const connectRepository = async (): Promise<void> => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.User = getManager(env.node).getRepository(User);
    AppRepository.Contents = getManager(env.node).getRepository(Contents);
    AppRepository.Role = getManager(env.node).getRepository(Role);
    AppRepository.UserRole = getManager(env.node).getRepository(UserRole);
  }
};
