import { Module } from "@nestjs/common";

// import { CreateSettingsHandler } from './commands/create-settings.command';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ApiConfigService } from "shared/services/api-config.service";

const handlers = [
  // CreateSettingsHandler,
  ApiConfigService,
];

@Module({
  imports: [],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, ...handlers],
})
export class UserModule {}
