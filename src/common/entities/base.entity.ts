/* eslint-disable indent*/
import { Exclude } from 'class-transformer';
import { BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Exclude()
  @Column({
    nullable: true,
  })
  createdBy: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  updatedBy: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  updateDates(): void {
    this.updatedAt = new Date();
  }
}
