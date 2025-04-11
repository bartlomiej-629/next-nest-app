import "./boilerplate.polyfill";

// import path from 'node:path';

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from "nestjs-cls";
/* import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n'; */

import { AuthModule } from "./modules/auth/auth.module";
import { HealthCheckerModule } from "./modules/health-checker/health-checker.module";
// import { PostModule } from './modules/post/post.module';
import { UserModule } from "./modules/user/user.module";
import { ApiConfigService } from "./shared/services/api-config.service";
// import { SharedModule } from './shared/shared.module';
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { SupabaseGuard, SupabaseModule } from "modules/supabase";
import { APP_GUARD } from "@nestjs/core";
import { NestDrizzleModule } from "modules/drizzle/drizzle.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available throughout the app
      envFilePath: ["staging", "production"].includes(
        process.env.NODE_ENV as string,
      )
        ? [`../.env.${process.env.NODE_ENV}.local`, "../.env.local", "../.env"]
        : [".env.local", `.env.${process.env.NODE_ENV}.local`, ".env"],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    AuthModule,
    UserModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    /* ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [ApiConfigService],
    }), */
    NestDrizzleModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => {
        return { ...configService.drizzleConfig };
      },
      inject: [ApiConfigService],
    }),
    /* I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
        resolvers: [
          { use: QueryResolver, options: ['lang'] },
          AcceptLanguageResolver,
          new HeaderResolver(['x-lang']),
        ],
      }),
      imports: [SharedModule],
      inject: [ApiConfigService],
    }), */
    HealthCheckerModule,
    SupabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class AppModule {}
