import { CommonEntity } from "../../Common/entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserRole } from "../../../models/User/entity/UserRole";

export interface RoleIE {
  id?: number;
  name?: string;
  isDeleted?: boolean;
}
@Entity("role")
export class Role extends CommonEntity implements RoleIE {
  @PrimaryGeneratedColumn({ name: "role_id" })
  id: number;

  @Column({ name: "role_name", length: 10, unique: true })
  name: string;

  @OneToMany((type) => UserRole, (uerRole) => uerRole.role, {
    lazy: true,
    cascade: true,
  })
  userRoles: UserRole[];

  @Column({ name: "role_del", default: false })
  isDeleted: boolean;
}
