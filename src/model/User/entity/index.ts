import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { hashSync } from "../../../utils";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ name: "user_email", length: 50, unique: true })
  email: string;

  @Column({ name: "user_nickname", length: 10 })
  nickname: string;

  @Column({
    name: "user_password",
    length: 200,
    transformer: {
      to: (str: string) => hashSync(str),
      from: (str: string) => str,
    },
  })
  password: string;

  @Column({ default: false })
  isDeleted: boolean;
}
