import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725069804996 implements MigrationInterface {
  name = "Default1725069804996";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "measure_type"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."measurements_measure_type_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "measure_type" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76" UNIQUE ("fk_customer_id", "measure_type", "measure_datetime")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "measure_type"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."measurements_measure_type_enum" AS ENUM('WATER', 'GAS')`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "measure_type" "public"."measurements_measure_type_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76" UNIQUE ("measure_datetime", "measure_type", "fk_customer_id")`
    );
  }
}
