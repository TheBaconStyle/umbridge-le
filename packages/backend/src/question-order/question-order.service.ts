import { Injectable } from '@nestjs/common'

@Injectable()
export class QuestionOrderService {
  create() {
    return 'This action adds a new questionOrder'
  }

  findAll() {
    return `This action returns all questionOrder`
  }

  findOne(id: number) {
    return `This action returns a #${id} questionOrder`
  }

  update(id: number) {
    return `This action updates a #${id} questionOrder`
  }

  remove(id: number) {
    return `This action removes a #${id} questionOrder`
  }
}
