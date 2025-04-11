import { AbstractEntity } from "../../common/abstract.entity";
import { ConversationParticipantDto } from "./dtos/conversation-participant.dto";
import { ConversationEntity } from "../conversation/conversation.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UseDto } from "../../decorators";

@Entity("conversation_participants")
@UseDto(ConversationParticipantDto)
export class ConversationParticipantEntity extends AbstractEntity<ConversationParticipantDto> {
  @ManyToOne(() => ConversationEntity, { onDelete: "CASCADE" })
  conversation!: ConversationEntity;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  user!: UserEntity;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joinedAt!: Date;

  constructor(partial: Partial<ConversationParticipantEntity> = {}) {
    super();
    Object.assign(this, partial);
  }
}
