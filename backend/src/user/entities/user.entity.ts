import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  email: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  Password: string;
}
