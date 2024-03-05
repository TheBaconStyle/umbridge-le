import { compare, genSalt, hash } from 'bcrypt'
import { IsEmail, IsNotEmpty, isStrongPassword } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty({ message: 'Empty password is not allowed' })
  private passwordHash: string

  @Column({ nullable: true })
  resetToken: string

  @Column()
  firstName: string

  @Column()
  middleName: string

  @Column()
  lastName: string

  getInitials() {
    return `${this.lastName} ${this.firstName.slice(
      0,
      2,
    )}. ${this.middleName.slice(0, 2)}.`
  }

  getFullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`
  }

  validatePassword(password: string) {
    return compare(password, this.passwordHash)
  }

  async updatePassword(newPassword: string) {
    if (!isStrongPassword(newPassword)) return false
    const salt = await genSalt(Number(process.env.SALT_ROUNDS) ?? 12)
    this.passwordHash = await hash(newPassword, salt)
    return true
  }
}
