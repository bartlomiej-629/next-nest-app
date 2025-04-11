import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { ThrottlerOptions } from "@nestjs/throttler";
import { isNil } from "lodash";
import type { Units } from "parse-duration";
import { default as parse } from "parse-duration";

// import { schema } from '../../modules/drizzle/schema';
import { NestDrizzleOptions } from "modules/drizzle/interfaces/drizzle.interfaces";

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  get isTest(): boolean {
    return this.nodeEnv === "test";
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + " environment variable is not a number");
    }
  }

  private getDuration(key: string, format?: Units): number {
    const value = this.getString(key);
    const duration = parse(value, format);

    if (duration === undefined) {
      throw new Error(`${key} environment variable is not a valid duration`);
    }

    return duration;
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + " env var is not a boolean");
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll("\\n", "\n");
  }

  get nodeEnv(): string {
    return this.getString("NODE_ENV");
  }

  get fallbackLanguage(): string {
    return this.getString("FALLBACK_LANGUAGE");
  }

  get throttlerConfigs(): ThrottlerOptions {
    return {
      ttl: this.getDuration("THROTTLER_TTL", "second"),
      limit: this.getNumber("THROTTLER_LIMIT"),
      // storage: new ThrottlerStorageRedisService(new Redis(this.redis)),
    };
  }

  get drizzleConfig(): NestDrizzleOptions {
    return {
      driver: "postgres-js",
      url: this.getString("DATABASE_URL"),
      options: {
        // schema,
      },
      migrationOptions: {
        migrationsFolder: "./database/migrations",
      },
    };
  }

  get supabaseConfig() {
    return {
      url: this.getString("SUPABASE_PROJECT_URL"),
      anonKey: this.getString("SUPABASE_ANON_KEY"),
      serviceRoleKey: this.getString("SUPABASE_SERVICE_ROLE_KEY"),
      jwtSecret: this.getString("SUPABASE_JWT_SECRET"),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean("ENABLE_DOCUMENTATION");
  }

  get natsEnabled(): boolean {
    return this.getBoolean("NATS_ENABLED");
  }

  get natsConfig() {
    return {
      host: this.getString("NATS_HOST"),
      port: this.getNumber("NATS_PORT"),
    };
  }

  get authConfig() {
    return {
      privateKey: this.getString("JWT_PRIVATE_KEY"),
      publicKey: this.getString("JWT_PUBLIC_KEY"),
      jwtExpirationTime: this.getNumber("JWT_EXPIRATION_TIME"),
    };
  }

  get appConfig() {
    return {
      port: this.getString("PORT"),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + " environment variable does not set"); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
