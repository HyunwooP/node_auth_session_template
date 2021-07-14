import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { User } from ".";
import { Role } from "../../../models/Role/entity";

@Entity("userRole")
export class UserRole {
  @PrimaryGeneratedColumn({ name: "user_role_id" })
  id: number;

  @ManyToOne((type) => User, (user) => user.userRoles, {
    primary: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: number;

  @ManyToOne((type) => Role, (role) => role.userRoles, {
    primary: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: number;
}
