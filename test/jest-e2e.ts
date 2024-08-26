import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  // NOTE: The tsconfig paths must be duplicated here.
  moduleNameMapper: pathsToModuleNameMapper({
    '~modules/*': ['<rootDir>/../src/modules/*'],
    '~config/*': ['<rootDir>/../src/config/*'],
    '~common/*': ['<rootDir>/../src/common/*'],
  }),
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.json' }] },
};

export default config;
