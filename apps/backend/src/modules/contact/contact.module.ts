import { Module } from "@nestjs/common";

// import { CreateSettingsHandler } from './commands/create-settings.command';
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ApiConfigService } from "shared/services/api-config.service";
import { NestDrizzleModule } from "modules/drizzle/drizzle.module";

const handlers = [
  // CreateSettingsHandler,
  ApiConfigService,
];

@Module({
  imports: [NestDrizzleModule],
  controllers: [ContactController],
  exports: [ContactService],
  providers: [ContactService, ...handlers],
})
export class ContactModule { }
