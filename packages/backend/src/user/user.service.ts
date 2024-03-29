import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TCreateUserSchema, createUserSchema } from './schema/createUser.schema'
import { compare, genSalt, hash } from 'bcrypt'
import { isStrongPassword } from 'class-validator'
import { publicProcedure, router } from '@server/trpc'
import { instanceToPlain } from 'class-transformer'
import { signInSchema } from './schema/signIn.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  router = router({
    create: publicProcedure
      .input(createUserSchema)
      .mutation(({ input }) => this.create(input)),
    signIn: publicProcedure
      .input(signInSchema)
      .mutation(async ({ input: { email, password } }) => {
        const user = await this.findOne({ where: { email } })
        if (!user)
          throw new UnauthorizedException('User with this email does not exist')
        if (!(await this.validatePassword(user, password)))
          throw new UnauthorizedException('Incorrect email or password')
        return instanceToPlain(user)
      }),
  })

  async create({ password, ...data }: TCreateUserSchema) {
    const newUser = this.userRepo.create(data)
    if (!(await this.updatePassword(newUser, password)))
      throw new BadRequestException('password is not strong')
    return instanceToPlain(this.userRepo.save(newUser))
  }

  findAll = this.userRepo.find

  findOne = this.userRepo.findOne

  update(id: string, data: Partial<User>) {
    return this.userRepo.update({ id }, data)
  }

  remove = this.userRepo.remove

  getInitials(user: User) {
    const firstInitial = user.firstName
      ? user.firstName.slice(0, 2).concat('. ')
      : ''
    const middleInitial = user.middleName
      ? user.middleName.slice(0, 2).concat('. ')
      : ''
    const lastInitial = user.lastName ? user.lastName.concat(' ') : ''
    return lastInitial + firstInitial + middleInitial
  }

  getFullName(user: User) {
    const lastName = user.lastName ? user.lastName.concat(' ') : ''
    const firstName = user.firstName ? user.firstName.concat(' ') : ''
    const middleName = user.middleName ?? ''
    return lastName + firstName + middleName
  }

  validatePassword(user: User, password: string) {
    return compare(password, user.password)
  }

  async updatePassword(user: User, newPassword: string) {
    if (!isStrongPassword(newPassword)) return false
    const salt = await genSalt(Number(process.env.SALT_ROUNDS) ?? 12)
    user.password = await hash(newPassword, salt)
    return true
  }
}
