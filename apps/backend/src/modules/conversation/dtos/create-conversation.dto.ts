import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateConversationDto {
  @IsBoolean()
  isGroup?: boolean;

  @IsOptional()
  @IsString()
  groupName?: string;
}
