export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_TYPE: 'mysql' | 'mariadb' | 'postgres' | 'sqlite';
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    }
  }
}
