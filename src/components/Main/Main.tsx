import { ComponentProps, PropsWithChildren, useState } from 'react';

import { User } from 'firebase/auth';
import { UserProvider } from './context';
import { auth } from '../../service/firebase';
import { useMount } from '../../hooks/useMount';

export function Main(props: PropsWithChildren<unknown>) {
  const { children, user } = useViewController(props);

  return <UserProvider value={{ user }}>{children}</UserProvider>;
}

function useViewController(props: ComponentProps<typeof Main>) {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    function callback(user: User | null) {
      setUser(user);
    }

    auth.subscribe(callback);

    return () => {
      auth.unsubscribe(callback);
    };
  });

  return {
    children,
    user,
  };
}
