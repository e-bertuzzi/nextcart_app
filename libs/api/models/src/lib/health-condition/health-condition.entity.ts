import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  //ManyToOne,
} from 'typeorm';

@Entity()
export class HealthCondition {
  @PrimaryGeneratedColumn()
  healthConditionId!: number;

  @Column({ unique: true })
  description?: string;
}
