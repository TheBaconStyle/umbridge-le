import { MigrationInterface, QueryRunner } from "typeorm";

export class Notebook1710148476802 implements MigrationInterface {
    name = 'Notebook1710148476802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attempt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "result" character varying, "closed" TIME NOT NULL, "userId" uuid, CONSTRAINT "PK_5f822b29b3128d1c65d3d6c193d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "variants" jsonb NOT NULL, "answer" jsonb NOT NULL, "order_index" integer NOT NULL, "questionId" uuid, CONSTRAINT "PK_f7e5b54444da30d8dac3b84f002" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."question_type_enum" AS ENUM('single', 'multiple', 'order', 'match', 'open')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "type" "public"."question_type_enum" NOT NULL, "variants" jsonb, "answer" jsonb NOT NULL, "taskId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "theme" character varying NOT NULL, "description" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start" TIMESTAMP WITH TIME ZONE NOT NULL, "finish" TIMESTAMP WITH TIME ZONE NOT NULL, "attempts" integer NOT NULL, "questions" integer NOT NULL, "pass" integer NOT NULL, "good" integer NOT NULL, "excellent" integer NOT NULL, "taskId" uuid, CONSTRAINT "PK_929d02e1056afd838f2c2958684" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "teacherId" uuid, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "resetToken" character varying, "firstName" character varying NOT NULL, "middleName" character varying NOT NULL, "lastName" character varying NOT NULL, "groupId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_courses_course" ("groupId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_667c6d1a6074f5d494e8536bee6" PRIMARY KEY ("groupId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10490da6cd0230e3eda56e9641" ON "group_courses_course" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3076bcddf827a71f94e3cd948" ON "group_courses_course" ("courseId") `);
        await queryRunner.query(`CREATE TABLE "group_task_sessions_task_session" ("groupId" uuid NOT NULL, "taskSessionId" uuid NOT NULL, CONSTRAINT "PK_d8615383f5423cc59cb17d06526" PRIMARY KEY ("groupId", "taskSessionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44fd7841a422bfe2f9276c0d27" ON "group_task_sessions_task_session" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2911ee108b24f9df52f5cfa56" ON "group_task_sessions_task_session" ("taskSessionId") `);
        await queryRunner.query(`CREATE TABLE "role_users_user" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_46403d6ce64cde119287c876ca3" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "attempt" ADD CONSTRAINT "FK_dd8844876037b478f5bb859512e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_order" ADD CONSTRAINT "FK_c4da7260e9413cbb4236b5dbb20" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_385c6d28dfcf0163cc85abc1c88" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5b67a8cf2236b014dcf547f5d66" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_session" ADD CONSTRAINT "FK_b47dbb51445b531920c70a9faf6" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" ADD CONSTRAINT "FK_10490da6cd0230e3eda56e9641d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" ADD CONSTRAINT "FK_d3076bcddf827a71f94e3cd9480" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" ADD CONSTRAINT "FK_44fd7841a422bfe2f9276c0d278" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" ADD CONSTRAINT "FK_f2911ee108b24f9df52f5cfa569" FOREIGN KEY ("taskSessionId") REFERENCES "task_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797"`);
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54"`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" DROP CONSTRAINT "FK_f2911ee108b24f9df52f5cfa569"`);
        await queryRunner.query(`ALTER TABLE "group_task_sessions_task_session" DROP CONSTRAINT "FK_44fd7841a422bfe2f9276c0d278"`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" DROP CONSTRAINT "FK_d3076bcddf827a71f94e3cd9480"`);
        await queryRunner.query(`ALTER TABLE "group_courses_course" DROP CONSTRAINT "FK_10490da6cd0230e3eda56e9641d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b"`);
        await queryRunner.query(`ALTER TABLE "task_session" DROP CONSTRAINT "FK_b47dbb51445b531920c70a9faf6"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5b67a8cf2236b014dcf547f5d66"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_385c6d28dfcf0163cc85abc1c88"`);
        await queryRunner.query(`ALTER TABLE "question_order" DROP CONSTRAINT "FK_c4da7260e9413cbb4236b5dbb20"`);
        await queryRunner.query(`ALTER TABLE "attempt" DROP CONSTRAINT "FK_dd8844876037b478f5bb859512e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a88fcb405b56bf2e2646e9d479"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed6edac7184b013d4bd58d60e5"`);
        await queryRunner.query(`DROP TABLE "role_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2911ee108b24f9df52f5cfa56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44fd7841a422bfe2f9276c0d27"`);
        await queryRunner.query(`DROP TABLE "group_task_sessions_task_session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3076bcddf827a71f94e3cd948"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10490da6cd0230e3eda56e9641"`);
        await queryRunner.query(`DROP TABLE "group_courses_course"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "task_session"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "question_order"`);
        await queryRunner.query(`DROP TABLE "attempt"`);
    }

}
