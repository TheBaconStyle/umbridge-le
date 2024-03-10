import { Injectable } from '@nestjs/common'

@Injectable()
export class TaskSessionService {
  create() {
    return 'This action adds a new session'
  }

  findAll() {
    return `This action returns all session`
  }

  findOne(id: number) {
    return `This action returns a #${id} session`
  }

  update(id: number) {
    return `This action updates a #${id} session`
  }

  remove(id: number) {
    return `This action removes a #${id} session`
  }
}
