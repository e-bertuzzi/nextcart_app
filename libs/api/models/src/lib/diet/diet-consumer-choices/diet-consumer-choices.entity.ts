import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Consumer } from '../../consumer';
import { Diet } from '..';

//@Entity('DietConsumerChoices')
@Entity()
export class DietConsumerChoice {
  // Esplicita le foreign key come colonne primarie
  @PrimaryColumn({ name: 'consumer' })
  consumerId!: number;

  @PrimaryColumn({ name: 'diet' })
  dietId!: string;

  // Relazione con Consumer
  @ManyToOne(() => Consumer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'consumer' })
  consumer!: Consumer;

  // Relazione con Diet
  @ManyToOne(() => Diet)
  @JoinColumn({ name: 'diet' })
  diet!: Diet;
}
