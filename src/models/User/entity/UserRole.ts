import { Entity, ManyToOne, JoinColumn } from "typeorm";

import { User } from ".";
import { Role } from "../../../models/Role/entity";

@Entity("userRole")
export class UserRole {
  @ManyToOne((type) => User, (user) => user.userRoles, {
    primary: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: User;

  @ManyToOne((type) => Role, (role) => role.userRoles, {
    primary: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id", referencedColumnName: "roleId" })
  role: Role;
}
