import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { Consumer } from '../consumer/consumer.entity';

@Entity('physical_activity')
export class PhysicalActivity {
  @PrimaryGeneratedColumn()
  physicalActivityId!: number;

  @ManyToOne(() => Activity, (activity) => activity.physicalActivities, { eager: true })
  @JoinColumn({ name: 'activity' })
  activity!: Activity;

  @ManyToOne(() => Consumer, (consumer) => consumer.physicalActivities, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'consumer' })
  consumer!: Consumer;

  @Column({ type: 'text' })
  specificActivity!: string;

  @Column({ type: 'int' })
  durationMinutes!: number;

  @Column({ type: 'date' })
  date!: string;
}
