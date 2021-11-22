import { PropsWithChildren, useState } from 'react';

import { useMount } from '../hooks/useMount';

interface Props {
  readonly init: () => Promise<void>;
}

export function Loader(props: PropsWithChildren<Props>): JSX.Element {
  const { init, children } = props;
  const [loading, setLoading] = useState(true);

  useMount(() => {
    init().then(() => setLoading(() => false));
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
