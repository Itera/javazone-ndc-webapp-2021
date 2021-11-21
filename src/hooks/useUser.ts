import { User, getAuth } from 'firebase/auth';

import { useFirebase } from '../features/firebase/FirebaseProvider';

export function useUser(): User | null {
  const { app } = useFirebase();
  return getAuth(app).currentUser;
}
