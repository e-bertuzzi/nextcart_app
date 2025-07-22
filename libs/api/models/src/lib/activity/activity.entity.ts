import { PrimaryColumn, Column, Entity, OneToMany } from 'typeorm';
import { PhysicalActivity } from '../physical-activity/physical-activity.entity';

@Entity()
export class Activity {
  @PrimaryColumn()
  activityId!: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  MET?: number;

  @Column({ length: 50, nullable: true })
  ActivityType?: string;

  @Column({ type: 'text', nullable: true })
  SpecificActivity?: string;

  @OneToMany(() => PhysicalActivity, (physicalActivity) => physicalActivity.activity)
  physicalActivities?: PhysicalActivity[];
}
