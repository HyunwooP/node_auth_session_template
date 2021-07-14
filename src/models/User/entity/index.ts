import { CommonEntity } from "../../Common/entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { hashSync } from "../../../utils";
import { UserRole } from "./UserRole";

export interface UserIE {
  userId?: number;
  userEmail?: string;
  userNickname?: string;
  userPw?: string;
  isDeleted?: boolean;
  token?: string;
  userRoles?: UserRole[];
}
@Entity("user")
export class User extends CommonEntity implements UserIE {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;

  @Column({ name: "user_email", length: 50, unique: true })
  userEmail: string;

  @Column({ name: "user_name", length: 10 })
  userNickname: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    cascade: true,
    eager: true,
  })
  userRoles: UserRole[];

  @Column({
    name: "user_pw",
    length: 200,
    transformer: {
      to: (str: string) => hashSync(str),
      from: (str: string) => str,
    },
  })
  userPw: string;

  @Column({ name: "user_del", default: false })
  isDeleted: boolean;

  findRole() {
    return {
      join: {
        alias: "user",
        leftJoinAndSelect: {
          userRole: "user.userRoles",
          role: "userRole.role",
        },
      },
    };
  }
}
