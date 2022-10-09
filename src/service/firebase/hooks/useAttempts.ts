import { Logger } from '../../logger';
import { push } from 'firebase/database';
import { useDailyDatabase } from './useDailyDatabase';

const logger = new Logger('useAttempt');

type Attempt = {
  username: string;
  start: number;
  finish: number;
};

export function useAttempts() {
  const { attempts } = useDailyDatabase();

  async function registerAttempt(payload: Attempt): Promise<void> {
    logger.trace(`Registering attempt for [user=${payload.username}]`);

    logger.debug(
      `Attempting to store attempt in realtime database with [payload=${JSON.stringify(
        payload,
      )}]`,
    );

    const { key } = await push(attempts, payload);
    logger.info(`Successfully stored attempt on [key=${key}]`);
  }

  return {
    registerAttempt,
  };
}
