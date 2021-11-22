import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { useFirebase } from '../features/firebase/FirebaseProvider';
import { useLocation } from 'react-router';

export function RouteListener(): null {
  const { analytics } = useFirebase();
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
    });
  }, [location.pathname, analytics]);

  return null;
}
