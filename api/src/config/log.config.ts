import bunyan from 'bunyan';
class LogConfig {
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
}

export const logConfig: LogConfig = new LogConfig();
