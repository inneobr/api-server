import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726515119422 implements MigrationInterface {
    name = 'Default1726515119422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trending" ("id" number GENERATED BY DEFAULT AS IDENTITY, "uuid" varchar2(255), "message" varchar2(255), "base64" clob, "created" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "usuario_id" number, CONSTRAINT "PK_67fa365dcd46bd65397a019bec4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" number GENERATED BY DEFAULT AS IDENTITY, "uuid" varchar2(255), "name" varchar2(255) NOT NULL, "biografia" varchar2(255), "base64" clob, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" number GENERATED BY DEFAULT AS IDENTITY, "uuid" varchar2(255), "username" varchar2(255) NOT NULL, "password" varchar2(255) NOT NULL, "profileId" number, CONSTRAINT "REL_760bd7f757ec1358f55aa2bfa9" UNIQUE ("profileId"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trending" ADD CONSTRAINT "FK_b79e5990b0ecdb3b5eccc67c0df" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id")`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e" FOREIGN KEY ("profileId") REFERENCES "profile" ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_760bd7f757ec1358f55aa2bfa9e"`);
        await queryRunner.query(`ALTER TABLE "trending" DROP CONSTRAINT "FK_b79e5990b0ecdb3b5eccc67c0df"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "trending"`);
    }

}
