import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  text: string

  @Column('enum')
  type: 'single' | 'multiple' | 'order' | 'match' | 'open'

  @Column('json')
  variants: string
}
