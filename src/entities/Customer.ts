import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Measure } from "./Measure";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  customer_code: string;

  @OneToMany(() => Measure, measure => measure.customer)
  measurements: Measure[];
}