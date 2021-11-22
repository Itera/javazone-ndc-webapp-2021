import { Config } from '../config/Config';

export class Logger {
  private name: string;
  private level: number;

  constructor(name: string) {
    this.name = name;
    const logLevel = Config.getFeatures().logging;
    this.level = ['trace', 'debug', 'info', 'warn', 'error'].indexOf(logLevel);
  }

  trace(...message: Array<any>) {
    if (this.level === 0) {
      console.trace(`[${this.name}]`, ...message);
    }
  }

  debug(...message: Array<any>) {
    if (this.level <= 1) {
      console.debug(`[${this.name}]`, ...message);
    }
  }

  info(...message: Array<any>) {
    if (this.level <= 2) {
      console.info(`[${this.name}]`, ...message);
    }
  }

  warn(...message: Array<any>) {
    if (this.level <= 3) {
      console.warn(`[${this.name}]`, ...message);
    }
  }

  error(...message: Array<any>) {
    if (this.level <= 4) {
      console.error(`[${this.name}]`, ...message);
    }
  }
}
