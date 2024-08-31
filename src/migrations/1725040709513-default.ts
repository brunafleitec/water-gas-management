import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725040709513 implements MigrationInterface {
  name = "Default1725040709513";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurements" RENAME COLUMN "image" TO "value"`
    );
    await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "value" double precision NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "measurements" ADD "value" text NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "measurements" RENAME COLUMN "value" TO "image"`
    );
  }
}
