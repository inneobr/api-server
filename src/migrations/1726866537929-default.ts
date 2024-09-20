import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726866537929 implements MigrationInterface {
    name = 'Default1726866537929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e" FOREIGN KEY ("profileId") REFERENCES "profile" ("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e" FOREIGN KEY ("profileId") REFERENCES "profile" ("id")`);
    }

}
