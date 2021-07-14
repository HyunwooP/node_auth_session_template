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
        role.roleName = item.roleName;
        AppRepository.Role.save(role);
      }))(),
    (() =>
      // User Table 생성
      sampleUsers.forEach((item: UserIE, idx: number) => {
        const user = new User();
        user.userEmail = item.userEmail + idx;
        user.userPw = item.userPw;
        user.userNickname = item.userNickname + idx;
        AppRepository.User.save(user);
      }))(),
    // Content Table 생성
    (() =>
      sampleContents.forEach((item: ContentsIE, idx: number) => {
        const contents = new Contents();
        contents.contImageLink = item.contImageLink;
        contents.contTitle = item.contTitle + idx;
        contents.contSubTitle = item.contSubTitle + idx;
        contents.contDesc = item.contDesc + idx;
        AppRepository.Contents.save(contents);
      }))(),
  ])
    .then(() => {
      setTimeout(async () => {
        const user = await AppRepository.Role.findOne({
          roleId: 1,
        });

        const admin = await AppRepository.Role.findOne({
          roleId: 2,
        });
        // Relation User Role Table 생성
        (() =>
          sampleUsers.forEach(async (item: UserIE, idx: number) => {
            const userRole = new UserRole();
            if (idx % 2 === 0) {
              userRole.role = user;
            } else {
              userRole.role = admin;
            }
            userRole.user = await AppRepository.User.findOne({
              userEmail: item.userEmail + idx,
            });
            AppRepository.UserRole.save(userRole);
          }))();
      }, 2000);
    })
    .then(() => {
      console.log("App Created Test Datas End!!!!");
    })
    .catch((e) => console.log("generateTestData Failed!!", e));
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
