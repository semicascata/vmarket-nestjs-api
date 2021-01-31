import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact1: string;

  @Column({ nullable: true })
  contact2: string;
}
