import { DateField, NumberField } from "decorators";

export class UpdateConversationParticipantDto {
  @NumberField({
    optional: true,
    nullable: true,
    message: "conversationId must be a number",
  })
  conversationId?: number;

  @NumberField({
    optional: true,
    nullable: true,
    message: "userId must be a number",
  })
  userId?: number;

  @DateField({
    optional: true,
    nullable: true,
    message: "joinedAt must be a valid date",
  })
  joinedAt?: Date;
}
