import { CommonEntity } from "../../Common/entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface ContentsIE {
  contId?: number;
  contImageLink?: string;
  contTitle?: string;
  contSubTitle?: string;
  contDesc?: string;
  isDeleted?: boolean;
}

@Entity("contents")
export class Contents extends CommonEntity implements ContentsIE {
  @PrimaryGeneratedColumn({ name: "cont_id" })
  contId: number;

  @Column({ name: "cont_img_link", length: 50 })
  contImageLink: string;

  @Column({ name: "cont_title", length: 10 })
  contTitle: string;

  @Column({ name: "cont_sub_title", length: 10, nullable: true })
  contSubTitle: string;

  @Column({ name: "cont_desc", length: 200, nullable: true })
  contDesc: string;

  @Column({ name: "cont_del", default: false })
  isDeleted: boolean;
}
