import { ProductsOrder } from './../dto/order.dto';
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

  @Column('text', { array: true, default: {} })
  products: ProductsOrder[];

  @Column('float')
  total: number;

  @Column('enum', {
    nullable: false,
    enum: Status,
    default: Status.open,
  })
  status: Status;

  @Column()
  deliveryTime: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
