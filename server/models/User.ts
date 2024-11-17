import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Adresse } from "./Adresse";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  vorname: string;

  @Column({ type: "varchar", length: 100 })
  nachname: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  handynummer?: string;

  @Column({ type: "date" })
  geburtsdatum: Date;
  @Column({ type: "varchar", nullable: true })
  image: string;

  @ManyToOne(() => Adresse, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "adresse_id" })
  adresse: Adresse;

  @Column({
    type: "varchar",
    length: 6,
    default: "USER",
  })
  rolle: string;
  @Column({ type: "varchar", length: 150, nullable: true })
  verifyToken?: string;
  @Column({ type: "varchar", length: 6, nullable: true })
  verifyStatus?: boolean;
  @Column({ type: "varchar", length: 150, nullable: true })
  resetpasswordtoken?: string;
  @Column({ type: "varchar", length: 6, nullable: true })
  resetPasswordStatus?: boolean;
}
