import { AbstractDto } from "../../../common/dto/abstract.dto";
import { NumberField, DateField } from "../../../decorators";
import type { ConversationParticipantEntity } from "../conversation-participant.entity";

export class ConversationParticipantDto extends AbstractDto {
  @NumberField()
  conversationId!: number;

  @NumberField()
  userId!: number;

  @DateField()
  joinedAt!: Date;

  constructor(participant: ConversationParticipantEntity) {
    super(participant); // Initialize id, createdAt, and updatedAt

    this.conversationId = participant.conversation.id;
    this.userId = participant.user.id;
    this.joinedAt = participant.joinedAt;
  }
}
