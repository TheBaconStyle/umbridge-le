import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Question } from './entities/question.entity'
import { Repository } from 'typeorm'
import { publicProcedure, router } from '@server/trpc'
import { createQuestionSchema } from './schema/create.schema'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  router = router({
    create: publicProcedure.input(createQuestionSchema).query(({ input }) => {
      return JSON.stringify(input)
    }),
  })

  create() {
    return 'This action adds a new question'
  }

  findAll() {
    return `This action returns all question`
  }

  findOne(id: number) {
    return `This action returns a #${id} question`
  }

  update(id: number) {
    return `This action updates a #${id} question`
  }

  remove(id: number) {
    return `This action removes a #${id} question`
  }
}
