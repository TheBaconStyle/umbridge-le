import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  private readonly logger = new Logger(UserService.name)

  // userRouter = router({
  //   create: procedure.input(createUserSchema).mutation(async ({ input }) => {
  //     const plainResponse = instanceToPlain(await this.createUser(input))
  //     return plainResponse
  //   }),
  // })

  async createUser() {
    // { email, password }: z.infer<typeof createUserSchema>
    // const user = new User()
    // user.email = email
    // user.first_name = 'Ivan'
    // user.middle_name = 'Ivanovich'
    // user.last_name = 'Ivanov'
    // user.phone = '+7800543210'
    // const isPasswordStrong = await user.updatePassword('ZPzhgE2PBbjb@')
    // const validationErrors = await validate(user)
    // if (validationErrors.length > 0 || !isPasswordStrong) throw new BadRequestException('')
    // return await this.userRepo.save(user)
  }
}
