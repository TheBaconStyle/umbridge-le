import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1706447811473 implements MigrationInterface {
    name = 'Initial1706447811473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "first_name" varchar NOT NULL, "middle_name" varchar NOT NULL, "last_name" varchar NOT NULL, "phone" varchar NOT NULL, "password_hash" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
