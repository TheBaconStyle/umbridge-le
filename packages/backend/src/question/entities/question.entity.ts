import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { questionTypeVariants } from '../schema/create.schema'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column('enum', { enum: questionTypeVariants })
  type: (typeof questionTypeVariants)[number]

  @Column('jsonb', { nullable: true })
  variants: string[] | Record<string, string>

  @Column('jsonb')
  answer: string | number[] | number | Record<string, string>
}
