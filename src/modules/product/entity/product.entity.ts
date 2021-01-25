import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from '../dto/product.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  amount: number;

  @Column('enum', {
    nullable: false,
    enum: Type,
  })
  type: Type;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  value: number;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // @ManyToOne(
  //   () => Provider,
  //   provider => provider._providerProducts,
  // )
  // _provider: Provider;

  // @ManyToOne(
  //   () => User,
  //   user => user._products,
  // )
  // _user: User;
}
