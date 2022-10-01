export class Logger {
  private name;

  constructor(name: string) {
    this.name = name;
  }

  trace(...params: Array<unknown>): void {
    console.trace(`[name=${this.name}]`, ...params);
  }

  debug(...params: Array<unknown>): void {
    console.debug(`[name=${this.name}]`, ...params);
  }

  info(...params: Array<unknown>): void {
    console.info(`[name=${this.name}]`, ...params);
  }

  warn(...params: Array<unknown>): void {
    console.warn(`[name=${this.name}]`, ...params);
  }

  error(...params: Array<unknown>): void {
    console.error(`[name=${this.name}]`, ...params);
  }
}
