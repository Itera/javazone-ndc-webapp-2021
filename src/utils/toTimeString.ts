export function toTimeString(start: number, finish: number): string {
  const elapsed = finish - start;
  const time = new Date(elapsed);

  return `${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`;
}
