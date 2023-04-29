import { useReducer } from 'react';

function reducer(state: number, _action: void) {
  return state + 1;
}

export function useForceUpdate() {
  const [, forceUpdate] = useReducer(reducer, 0);
  return forceUpdate;
}
