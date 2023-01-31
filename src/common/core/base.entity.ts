import { Exclude } from 'class-transformer';
import { BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Exclude()
  @Column({
    nullable: true,
    name: 'created_by',
  })
  createdBy: string;

  @Exclude()
  @Column({
    nullable: true,
    name: 'updated_by',
  })
  updatedBy: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateDates(): void {
    this.updatedAt = new Date();
  }
}
