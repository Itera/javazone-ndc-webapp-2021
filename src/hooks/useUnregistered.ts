import { Entry } from '../domain';
import { onValue } from 'firebase/database';
import { useDatabase } from './useDatabase';
import { useMount } from './useMount';
import { useState } from 'react';
import { Logger } from '../features/logging/logger';

export function useUnregistered(): [Array<Required<Entry>>] {
    const [logger] = useState(new Logger('useUnregistered'));
    const { unregistered } = useDatabase();
    const [unregisteredList, setUnregisteredList] = useState<Array<Required<Entry>>>([]);
  
    function updateStandings(entries: Array<Entry>) {
      logger.trace('Updating unregistered');
  
      const finished = entries.filter((entry) =>
        entry.hasOwnProperty('finish')
      ) as Array<Required<Entry>>;
  
      logger.debug('Found', `[finished=${finished.length}]`, 'finished entries');
      setUnregisteredList(() => finished);
    }
  
    function attachObserver() {
      logger.trace(
        'Attaching listener to unregistered document',
        unregistered.toString()
      );
      onValue(unregistered, (snapshot) => {
        if (!snapshot.exists()) {
          logger.warn('Found no data on', `[src=${unregistered.toString()}]`);
          return;
        }
  
        const data = snapshot.val() as Record<string, Entry>;
        const entries = Object.values(data);
        updateStandings(entries);
      });
    }
  
    useMount(() => {
      attachObserver();
    });
  
    return [unregisteredList];
}