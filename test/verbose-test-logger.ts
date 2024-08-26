import { ConsoleLogger } from '@nestjs/common';
import { log, error, warn, debug } from 'console';

/**
 * The `VerboseTestLogger` enables full logging during tests. Unlike the default @nestj `TestingLogger`,
 * which suppresses logs to keep test output clean.
 *
 * This logger is used when detailed logging is necessary during testing.
 *
 * ## Why Not `console.log`?
 *
 * In Jest, console.log and similar methods are overridden, suppressing the output.
 * This logger directly uses the native console functions (log, error, warn, debug)
 * to ensure log messages appear in the debug console.
 *
 * Example usage:
 *
 * ```typescript
 *    const moduleFixture: TestingModule = await Test.createTestingModule({
 *    }).compile();
 *
 *    moduleFixture.useLogger(new VerboseTestLogger());
 * ```
 */
export class VerboseTestLogger extends ConsoleLogger {
  public log(message: string) {
    log(message);
  }

  public error(message: string, trace: string) {
    error(message, trace);
  }

  public warn(message: string) {
    warn(message);
  }

  public debug(message: string) {
    debug(message);
  }

  public verbose(message: string) {
    log(message);
  }
}
