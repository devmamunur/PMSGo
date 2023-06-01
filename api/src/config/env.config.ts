import dotenv from 'dotenv';
dotenv.config({});

class EnvConfig {
  public DATABASE_URL: string | undefined;
  public APP_PORT: string | undefined;
  public JWT_SECRET_KEY: string | undefined;
  public FROM_EMAIL: string | undefined;
  public EMAIL_PASSWORD: string | undefined;
  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.APP_PORT = process.env.APP_PORT || '8000';
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
    this.FROM_EMAIL = process.env.FROM_EMAIL || '';
    this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
  }
  public validateEnvConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} in undefined`);
      }
    }
  }
}

export const envConfig: EnvConfig = new EnvConfig();
