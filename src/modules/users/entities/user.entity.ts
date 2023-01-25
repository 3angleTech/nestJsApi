/* eslint-disable indent*/
import { Exclude, Expose } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { encrypt } from '../../../common/crypto/crypto';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Exclude()
  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Exclude()
  @Column({
    default: false,
  })
  active: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await encrypt(this.password);
  }
}
