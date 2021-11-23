function pad(value: number, length: number): string {
  return value.toString().padStart(length, "000");
}

export function toTimeString(start: number, finish: number): string {
  const elapsed = finish - start;
  const time = new Date(elapsed);

  const minutes = pad(time.getMinutes(), 2);
  const seconds = pad(time.getSeconds(), 2);
  const milliseconds = pad(time.getMilliseconds(), 3);

  return `${minutes}:${seconds}:${milliseconds}`;
}
