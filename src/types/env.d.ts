export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_BUCKET_NAME: string;
      AWS_BUCKET_REGION: string;
      AWS_USER_ACCESS_KEY: string;
      AWS_USER_SECRET_KEY: string;
      ENV: 'production' | 'develop' | 'test';
    }
  }
}
