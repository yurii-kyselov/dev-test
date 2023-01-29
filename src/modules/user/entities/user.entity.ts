import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
