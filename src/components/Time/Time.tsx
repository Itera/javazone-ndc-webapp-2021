export function Time(props: { elapsed: number }): JSX.Element {
  const { elapsed } = props;
  const date = new Date(elapsed);
  const isoTimeString = date.toISOString();
  const elapsedTime = isoTimeString.split(/[TZ.]/)[1];
  return <>{elapsedTime}</>;
}
