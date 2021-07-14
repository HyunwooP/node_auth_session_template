import { CommonEntity } from "../../Common/entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { hashSync } from "../../../utils";
import { UserRole } from "./UserRole";

export interface UserIE {
  id?: number;
  email?: string;
  nickname?: string;
  password?: string;
  isDeleted?: boolean;
  token?: string;
}
@Entity("user")
export class User extends CommonEntity implements UserIE {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ name: "user_email", length: 50, unique: true })
  email: string;

  @Column({ name: "user_name", length: 10 })
  nickname: string;

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
  password: string;

  @Column({ name: "user_del", default: false })
  isDeleted: boolean;
}
