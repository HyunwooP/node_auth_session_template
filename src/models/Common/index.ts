import { Column } from "typeorm";

export class CommonEntity {
  @Column({
    name: "crt_dt",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @Column({
    name: "udt_dt",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: string;
}
