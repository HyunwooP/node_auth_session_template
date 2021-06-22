import { CommonEntity } from "../../Common";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface ContentsIE {
  id?: number;
  imageLink?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  isDeleted?: boolean;
}

@Entity("contents")
export class Contents extends CommonEntity implements ContentsIE {
  @PrimaryGeneratedColumn({ name: "cont_id" })
  id: number;

  @Column({ name: "cont_img_link", length: 50 })
  imageLink: string;

  @Column({ name: "cont_title", length: 10 })
  title: string;

  @Column({ name: "cont_sub_title", length: 10, nullable: true })
  subTitle: string;

  @Column({ name: "cont_desc", length: 200, nullable: true })
  description: string;

  @Column({ name: "cont_del", default: false })
  isDeleted: boolean;
}
