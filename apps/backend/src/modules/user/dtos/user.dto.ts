import { AbstractDto } from "../../../common/dto/abstract.dto";
import { RoleType } from "../../../constants";
import {
  BooleanField,
  EmailField,
  EnumField,
  PhoneField,
  StringField,
} from "../../../decorators";
import type { UserEntity } from "../user.entity";

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @StringField({ optional: true, nullable: true })
  firstName?: string | null;

  @StringField({ optional: true, nullable: true })
  lastName?: string | null;

  @StringField({ optional: true, nullable: true })
  username!: string;

  @EnumField(() => RoleType, { optional: true })
  role?: RoleType;

  @EmailField({ optional: true, nullable: true })
  email?: string | null;

  @StringField({ optional: true, nullable: true })
  avatar?: string | null;

  @PhoneField({ optional: true, nullable: true })
  phone?: string | null;

  @BooleanField({ optional: true })
  isActive?: boolean;

  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.isActive = options?.isActive;
  }
}
