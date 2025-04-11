import { AbstractDto } from "../../../common/dto/abstract.dto";
import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators";
import type { ConversationEntity } from "../conversation.entity";

export type ConversationDtoOptions = Partial<{ isGroup: boolean }>;

export class ConversationDto extends AbstractDto {
  @BooleanFieldOptional({ nullable: false, default: false })
  isGroup?: boolean;

  @StringFieldOptional({ nullable: true })
  groupName?: string | null;

  constructor(
    conversation: ConversationEntity,
    // options?: ConversationDtoOptions,
  ) {
    super(conversation); // This will initialize id, createdAt, and updatedAt

    this.isGroup = conversation.isGroup;
    this.groupName = conversation.groupName;
  }
}
