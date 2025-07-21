import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Consumer } from '../consumer/consumer.entity';

@Entity()
export class BodyComposition {
  @PrimaryColumn()
  consumerId!: number;

  @PrimaryColumn({ type: 'date' })
  date!: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height?: number;

  @ManyToOne(() => Consumer, (consumer) => consumer.bodyCompositions)
  @JoinColumn({ name: 'consumerId' })
  consumer!: Consumer;
}
