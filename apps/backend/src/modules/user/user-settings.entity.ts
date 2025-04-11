import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "../../decorators";
import type { UserDtoOptions } from "./dtos/user.dto";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./user.entity";

@UseDto(UserDto)
export class UserSettingsEntity extends AbstractEntity<
  UserDto,
  UserDtoOptions
> {
  isEmailVerified?: boolean;

  isPhoneVerified?: boolean;

  userId?: string;

  user?: UserEntity;
}
