import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Question } from './entities/question.entity'
import { Repository } from 'typeorm'
import { publicProcedure, router } from '@server/trpc'
import {
  TCreateQuestionSchema,
  createQuestionSchema,
} from './schema/createQuestion.schema'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  router = router({
    create: publicProcedure
      .input(createQuestionSchema)
      .mutation(async ({ input }) => {
        return await this.create(input)
      }),
  })

  async create(data: TCreateQuestionSchema) {
    const newQuestion = new Question()
    newQuestion.text = data.text
    newQuestion.type = data.type
    newQuestion.variants = data.variants
    newQuestion.answer = data.answer
    return await this.questionRepo.save(newQuestion)
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
