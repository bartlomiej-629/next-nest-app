import { Module } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationController } from "./conversation.controller";

@Module({
  imports: [],
  controllers: [ConversationController], // Declare the controller
  providers: [ConversationService], // Provide the service
  exports: [ConversationService], // Export the service if it needs to be used in other modules
})
export class ConversationModule {}
