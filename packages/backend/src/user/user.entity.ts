import { compare, hash } from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, isStrongPassword } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsEmail()
  email: string

  @Column()
  @IsNotEmpty()
  first_name: string

  @Column()
  middle_name: string

  @Column()
  last_name: string

  // @Column()
  // phone: string

  @Exclude({ toPlainOnly: true })
  @Column()
  private password_hash: string

  async updatePassword(password: string) {
    if (!isStrongPassword(password)) {
      return false
    }
    this.password_hash = await hash(
      password,
      Number(process.env.SALT_ROUNDS) ?? 12,
    )
    return true
  }

  async validatePassword(pass: string) {
    return await compare(pass, this.password_hash)
  }
}
