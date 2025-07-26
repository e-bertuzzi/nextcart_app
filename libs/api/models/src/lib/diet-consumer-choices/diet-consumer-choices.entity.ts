import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Consumer } from '../consumer';
import { Diet } from '../diet';

//@Entity('DietConsumerChoices')
@Entity()
export class DietConsumerChoice {
  // Esplicita le foreign key come colonne primarie
  @PrimaryColumn({ name: 'Consumer' })
  consumerId!: number;

  @PrimaryColumn({ name: 'Diet' })
  dietId!: string;

  // Relazione con Consumer
  @ManyToOne(() => Consumer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Consumer' })
  consumer!: Consumer;

  // Relazione con Diet
  @ManyToOne(() => Diet)
  @JoinColumn({ name: 'Diet' })
  diet!: Diet;
}
