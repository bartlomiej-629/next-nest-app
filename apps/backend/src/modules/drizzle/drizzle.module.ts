import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { DrizzleService } from "./drizzle.service";
import {
  connectionFactory,
  createNestDrizzleProviders,
} from "./drizzle.provider";
import {
  NestDrizzleAsyncOptions,
  NestDrizzleOptions,
  NestDrizzleOptionsFactory,
} from "./interfaces/drizzle.interfaces";
import { NEST_DRIZZLE_OPTIONS } from "../../constants";
import { ApiConfigService } from "shared/services/api-config.service";

@Global()
@Module({
  providers: [DrizzleService, connectionFactory, ApiConfigService],
  exports: [DrizzleService, connectionFactory],
})
export class NestDrizzleModule {
  public static register(options: NestDrizzleOptions): DynamicModule {
    return {
      module: NestDrizzleModule,
      providers: createNestDrizzleProviders(options),
    };
  }

  public static registerAsync(options: NestDrizzleAsyncOptions): DynamicModule {
    return {
      module: NestDrizzleModule,
      providers: [...this.createProviders(options)],
    };
  }

  public static forRoot(options: NestDrizzleOptions): DynamicModule {
    const providers = createNestDrizzleProviders(options);
    return {
      module: NestDrizzleModule,
      providers: providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: NestDrizzleAsyncOptions): DynamicModule {
    return {
      module: NestDrizzleModule,
      providers: [...this.createProviders(options)],
      exports: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: NestDrizzleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    const providers: Provider[] = [this.createOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createOptionsProvider(
    options: NestDrizzleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_DRIZZLE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: NEST_DRIZZLE_OPTIONS,
      useFactory: async (optionsFactory: NestDrizzleOptionsFactory) =>
        await optionsFactory.createNestDrizzleOptions(),
      inject: [options.useExisting || options.useClass!],
    };
  }
}
