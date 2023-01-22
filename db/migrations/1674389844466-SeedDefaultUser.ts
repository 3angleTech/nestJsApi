import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';
import { DefaultUser } from '../seeds/default-user';

export class SeedDefaultUser1674389844466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(User);
    const user = userRepository.create(DefaultUser);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(User);
    await userRepository.delete({
      username: DefaultUser.username,
    });
  }
}
