import { AbstractDto } from "../../../common/dto/abstract.dto";
import { RoleType } from "../../../constants";
import {
  BooleanFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from "../../../decorators";
import type { ContactEntity } from "../contact.entity";

// TODO, remove this class and use constructor's second argument's type
export type ContactDtoOptions = Partial<{ isActive: boolean }>;

export class ContactDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  firstName?: string | null;

  @StringFieldOptional({ nullable: true })
  lastName?: string | null;


  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  avatar?: string | null;

  @PhoneFieldOptional({ nullable: true })
  phone?: string | null;

  @BooleanFieldOptional()
  isActive?: boolean;

  constructor(user: ContactEntity, options?: ContactDtoOptions) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.isActive = options?.isActive;
  }
}
