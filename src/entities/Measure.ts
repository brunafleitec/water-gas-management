import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Customer } from "./Customer";

@Entity("measurements")
@Unique(["customer", "measure_type", "measure_datetime"])
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "float" })
  value: number;

  @Column({ type: "date" })
  measure_datetime: Date;

  @Column({ type: "text" })
  measure_type: string;

  @ManyToOne(() => Customer, (customer) => customer.measurements)
  @JoinColumn({ name: "fk_customer_id" })
  customer: Customer;
}
