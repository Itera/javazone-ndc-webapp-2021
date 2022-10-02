import { Context, FirebaseContext, FirebaseProvider } from '../FirebaseContext';

import { Logger } from '../../logger';
import { useContext } from 'react';

const logger = new Logger('useFirebase');

export function useFirebase(): FirebaseContext {
  const context = useContext(Context);

  if (context === null) {
    logger.error('Attempted to access firebase context without Provider');
    throw new Error(`Hook must be wrapped by ${FirebaseProvider.name}`);
  }

  return context;
}
