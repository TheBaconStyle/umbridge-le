import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChange1710321829157 implements MigrationInterface {
    name = 'UserChange1710321829157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "passwordHash" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "passwordHash"`);
    }

}
