import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1724999629340 implements MigrationInterface {
    name = 'Default1724999629340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customer_code" text NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."measurements_measure_type_enum" AS ENUM('WATER', 'GAS')`);
        await queryRunner.query(`CREATE TABLE "measurements" ("id" SERIAL NOT NULL, "image" text NOT NULL, "measure_datetime" date NOT NULL, "measure_type" "public"."measurements_measure_type_enum", "fk_customer_id" integer, CONSTRAINT "UQ_dd89bdf89ba162dfadfb5584d76" UNIQUE ("fk_customer_id", "measure_type", "measure_datetime"), CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06" FOREIGN KEY ("fk_customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP CONSTRAINT "FK_8e29e8db3c81ad79f84d1324d06"`);
        await queryRunner.query(`DROP TABLE "measurements"`);
        await queryRunner.query(`DROP TYPE "public"."measurements_measure_type_enum"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
