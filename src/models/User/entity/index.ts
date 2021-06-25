import { CommonEntity } from "../../Common/entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { hashSync } from "../../../utils";

export interface UserIE {
  id?: number;
  email?: string;
  nickname?: string;
  password?: string;
  isDeleted?: boolean;
}
@Entity("user")
export class User extends CommonEntity implements UserIE {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ name: "user_em", length: 50, unique: true })
  email: string;

  @Column({ name: "user_nm", length: 10 })
  nickname: string;

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
