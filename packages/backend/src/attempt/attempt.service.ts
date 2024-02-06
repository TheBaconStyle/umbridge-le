import { Injectable } from '@nestjs/common'

@Injectable()
export class AttemptService {
  create() {
    return 'This action adds a new attempt'
  }

  findAll() {
    return `This action returns all attempt`
  }

  findOne(id: number) {
    return `This action returns a #${id} attempt`
  }

  update(id: number) {
    return `This action updates a #${id} attempt`
  }

  remove(id: number) {
    return `This action removes a #${id} attempt`
  }
}
