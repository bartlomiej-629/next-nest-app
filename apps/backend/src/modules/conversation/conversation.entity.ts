import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "../../decorators";
import { ConversationDto } from "./dtos/conversation.dto";

@UseDto(ConversationDto)
export class ConversationEntity extends AbstractEntity<ConversationDto> {
  isGroup: boolean = false; // Default to false

  groupName?: string | null;

  constructor(partial: Partial<ConversationEntity> = {}) {
    super();
    Object.assign(this, partial);
  }
}
