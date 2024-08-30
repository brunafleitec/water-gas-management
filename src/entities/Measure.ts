import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Customer } from "./Customer";

enum MeasureType {
  WATER = "WATER",
  GAS = "GAS"
}

@Entity("measurements")
@Unique(["customer", "measure_type", "measure_datetime"])
export class Measure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  image: string;

  @Column({ type: "date"})
  measure_datetime: Date;

  @Column({
    type: "enum",
    enum: MeasureType,
    nullable: true
  })
  measure_type: MeasureType;

  @ManyToOne(() => Customer, customer => customer.measurements)
  @JoinColumn({ name: "fk_customer_id" })
  customer: Customer;
}