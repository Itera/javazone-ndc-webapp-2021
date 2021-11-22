export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  trace(...message: Array<any>) {
    console.trace(`[${this.name}]`, ...message);
  }

  debug(...message: Array<any>) {
    console.debug(`[${this.name}]`, ...message);
  }

  info(...message: Array<any>) {
    console.info(`[${this.name}]`, ...message);
  }

  warn(...message: Array<any>) {
    console.warn(`[${this.name}]`, ...message);
  }

  error(...message: Array<any>) {
    console.error(`[${this.name}]`, ...message);
  }
}
