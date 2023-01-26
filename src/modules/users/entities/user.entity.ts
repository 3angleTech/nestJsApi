import { Exclude, Expose } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/core/base.entity';
import { encrypt } from '../../../common/crypto/crypto';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    unique: true,
    nullable: false,
    name: 'username',
  })
  username: string;

  @Exclude()
  @Column({
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column({
    unique: true,
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Exclude()
  @Column({
    default: false,
    name: 'active',
  })
  active: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await encrypt(this.password);
  }
}
