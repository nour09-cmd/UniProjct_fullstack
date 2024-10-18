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

  @ManyToOne(() => Adresse, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "adresse_id" })
  adresse: Adresse;

  @Column({
    type: "varchar",
    length: 6,
    default: "USER",
  })
  rolle: string;
}
