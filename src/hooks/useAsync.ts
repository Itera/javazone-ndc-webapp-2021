import { useCallback, useState } from 'react';
import { Logger } from '../features/logging/logger';

export function useAsync(f: (...args: any[]) => Promise<unknown>) {
  const [logger] = useState(new Logger('useAsync'));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const callback = useCallback(
    (...args: any[]): Promise<unknown> => {
      logger.trace('Async callback invoked');
      setLoading(() => true);
      setError(() => null);

      return f(...args)
        .then((res) => {
          logger.debug('Successfully invoked async callback');
          setResult(res);
        })
        .catch((err) => {
          logger.error(
            'Encountered an error while executing async callback',
            err
          );
          setError(err);
        })
        .finally(() => {
          logger.debug('Setting loading flag to "false"');
          setLoading(() => false);
        });
    },
    [f, logger]
  );

  return {
    callback,
    loading,
    error,
    result,
  };
}
