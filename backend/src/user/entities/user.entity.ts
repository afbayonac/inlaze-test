import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', unique: true, length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  password: string;
}
