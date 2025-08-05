import { PrimaryColumn, Column, Entity, OneToMany } from 'typeorm';
import { PhysicalActivity } from '../physical-activity/physical-activity.entity';

@Entity()
export class Activity {
  @PrimaryColumn({ name: 'activity_id' })
  activityId!: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true, name: 'met' })
  MET?: number;

  @Column({ length: 50, nullable: true, name: 'activity_type' })
  ActivityType?: string;

  @Column({ type: 'text', nullable: true, name: 'specific_activity' })
  SpecificActivity?: string;

  @OneToMany(() => PhysicalActivity, (physicalActivity) => physicalActivity.activity)
  physicalActivities?: PhysicalActivity[];
}
