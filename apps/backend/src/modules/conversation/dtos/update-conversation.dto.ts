import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateConversationDto {
  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;

  @IsOptional()
  @IsString()
  groupName?: string;
}
