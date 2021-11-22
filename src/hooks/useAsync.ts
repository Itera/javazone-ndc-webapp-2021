import { useCallback, useState } from 'react';

export function useAsync(f: (...args: any[]) => Promise<unknown>) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const callback = useCallback(
    (...args: any[]): Promise<unknown> => {
      console.trace('[useAsync] Async callback invoked');
      setLoading(() => true);
      setError(() => null);

      return f(...args)
        .then((res) => setResult(res))
        .catch((err) => setError(err))
        .finally(() => setLoading(() => false));
    },
    [f]
  );

  return {
    callback,
    loading,
    error,
    result,
  };
}
