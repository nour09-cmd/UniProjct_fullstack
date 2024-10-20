import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("adressen")
export class Adresse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  strasse: string;

  @Column({ type: "varchar", length: 100 })
  ort: string;

  @Column({ type: "int" })
  plz: string;
}
