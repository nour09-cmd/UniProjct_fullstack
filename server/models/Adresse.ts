import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("adressen")
export class Adresse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  strasse: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  ort: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  plz: string;
}
