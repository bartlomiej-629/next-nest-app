import { Module } from "@nestjs/common";
import { ConversationParticipantController } from "./conversation-participant.controller";
import { ConversationParticipantService } from "./conversation-participant.service";

@Module({
  imports: [],
  controllers: [
    ConversationParticipantController, // Register the controller
  ],
  providers: [
    ConversationParticipantService, // Register the service
  ],
  exports: [
    ConversationParticipantService, // Export the service if it needs to be used in other modules
  ],
})
export class ConversationParticipantModule {}
