import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1709925752462 implements MigrationInterface {
    name = 'Initial1709925752462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_users_user" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_46403d6ce64cde119287c876ca3" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "group_courses_course" ("groupId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_667c6d1a6074f5d494e8536bee6" PRIMARY KEY ("groupId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10490da6cd0230e3eda56e9641" ON "group_courses_course" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3076bcddf827a71f94e3cd948" ON "group_courses_course" ("courseId") `);
        await queryRunner.query(`CREATE TABLE "group_task_sessions_task_session" ("groupId" uuid NOT NULL, "taskSessionId" uuid NOT NULL, CONSTRAINT "PK_d8615383f5423cc59cb17d06526" PRIMARY KEY ("groupId", "taskSessionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44fd7841a422bfe2f9276c0d27" ON "group_task_sessions_task_session" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2911ee108b24f9df52f5cfa56" ON "group_task_sessions_task_session" ("taskSessionId") `);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" ADD CONSTRAINT "FK_10490da6cd0230e3eda56e9641d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" ADD CONSTRAINT "FK_d3076bcddf827a71f94e3cd9480" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" ADD CONSTRAINT "FK_44fd7841a422bfe2f9276c0d278" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" ADD CONSTRAINT "FK_f2911ee108b24f9df52f5cfa569" FOREIGN KEY ("taskSessionId") REFERENCES "task_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" DROP CONSTRAINT "FK_f2911ee108b24f9df52f5cfa569"`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" DROP CONSTRAINT "FK_44fd7841a422bfe2f9276c0d278"`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" DROP CONSTRAINT "FK_d3076bcddf827a71f94e3cd9480"`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" DROP CONSTRAINT "FK_10490da6cd0230e3eda56e9641d"`);
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797"`);
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2911ee108b24f9df52f5cfa56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44fd7841a422bfe2f9276c0d27"`);
        await queryRunner.query(`DROP TABLE "group_task_sessions_task_session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3076bcddf827a71f94e3cd948"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10490da6cd0230e3eda56e9641"`);
        await queryRunner.query(`DROP TABLE "group_courses_course"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a88fcb405b56bf2e2646e9d479"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed6edac7184b013d4bd58d60e5"`);
        await queryRunner.query(`DROP TABLE "role_users_user"`);
    }

}
