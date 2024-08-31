import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725057555517 implements MigrationInterface {
  name = "Default1725057555517";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06"`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "PK_3c0e7812563f27fd68e8271661b"`
    );
    await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "fk_customer_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "fk_customer_id" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76" UNIQUE ("fk_customer_id", "measure_type", "measure_datetime")`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06" FOREIGN KEY ("fk_customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP COLUMN "fk_customer_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "fk_customer_id" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" DROP CONSTRAINT "PK_3c0e7812563f27fd68e8271661b"`
    );
    await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76" UNIQUE ("measure_datetime", "measure_type", "fk_customer_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`
    );
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "customers" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06" FOREIGN KEY ("fk_customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
