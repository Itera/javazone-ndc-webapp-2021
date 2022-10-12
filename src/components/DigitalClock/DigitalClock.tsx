export function DigitalClock(props: { time: number }): JSX.Element {
  const { time } = props;
  const date = new Date(time);
  const isoTimeString = date.toISOString();
  const timeString = isoTimeString.split(/[TZ.]/)[1];
  return <>{timeString}</>;
}
