import { IsInt, IsNotEmpty } from "class-validator";

export class CreateConversationParticipantDto {
  @IsInt()
  @IsNotEmpty()
  conversationId?: number;

  @IsInt()
  @IsNotEmpty()
  userId?: number;

  @IsInt()
  @IsNotEmpty()
  joinedAt?: Date;
}
