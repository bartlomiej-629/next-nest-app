import type { Provider } from "@nestjs/common";
import { Global, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { ApiConfigService } from "./services/api-config.service";
import { GeneratorService } from "./services/generator.service";
import { TranslationService } from "./services/translation.service";
import { ValidatorService } from "./services/validator.service";

const providers: Provider[] = [
  ApiConfigService,
  ValidatorService,
  GeneratorService,
  TranslationService,
];

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
