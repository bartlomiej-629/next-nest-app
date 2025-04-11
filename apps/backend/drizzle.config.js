import { defineConfig } from 'drizzle-kit';
import { config } from '@dotenvx/dotenvx';

config({
  path: `./.env.${process.env.NODE_ENV}.local`,
});

export default defineConfig({
  schema: './src/database/schemas/**/*.ts',
  out: './src/database/drizzle/',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
