import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Question } from './entities/question.entity'
import { Repository } from 'typeorm'
import { publicProcedure, router } from '@server/trpc'
import {
  TCreateQuestionSchema,
  createQuestionSchema,
} from './schema/createQuestion.schema'
import {
  TUpdateQuestionSChema,
  updateQuestionSchema,
} from './schema/updateQuestion.schema'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  router = router({
    create: publicProcedure
      .input(createQuestionSchema)
      .mutation(({ input }) => this.create(input)),
    edit: publicProcedure
      .input(updateQuestionSchema)
      .mutation(({ input }) => this.update(input)),
  })

  async create(data: TCreateQuestionSchema) {
    const newQuestion = this.questionRepo.create(data)
    return this.questionRepo.save(newQuestion)
  }

  findAll() {
    return `This action returns all question`
  }

  findOne() {
    return `This action returns one question`
  }

  update({ id, ...data }: TUpdateQuestionSChema) {
    return this.questionRepo.update(id, data)
  }

  remove(ids: number | number[]) {
    return this.questionRepo.delete(ids)
  }
}
