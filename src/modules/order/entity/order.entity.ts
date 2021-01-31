import { Status } from '../dto/order.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { array: true, default: {} })
  products: number[];

  @Column()
  total: number;

  @Column('enum', {
    nullable: false,
    enum: Status,
    default: Status.open,
  })
  status: Status;

  @Column({ type: 'timestamp' })
  deliveryTime: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
