import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726864096140 implements MigrationInterface {
    name = 'Default1726864096140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagen" ADD "trendingId" number`);
        await queryRunner.query(`ALTER TABLE "imagen" ADD CONSTRAINT "UQ_b0e9b82a9c40f8012f8e97beb9c" UNIQUE ("trendingId")`);
        await queryRunner.query(`ALTER TABLE "imagen" ADD CONSTRAINT "FK_b0e9b82a9c40f8012f8e97beb9c" FOREIGN KEY ("trendingId") REFERENCES "trending" ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagen" DROP CONSTRAINT "FK_b0e9b82a9c40f8012f8e97beb9c"`);
        await queryRunner.query(`ALTER TABLE "imagen" DROP CONSTRAINT "UQ_b0e9b82a9c40f8012f8e97beb9c"`);
        await queryRunner.query(`ALTER TABLE "imagen" DROP COLUMN "trendingId"`);
    }

}
