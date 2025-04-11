import { BooleanField } from "decorators";

export class CreateSettingsDto {
  @BooleanField({ optional: true })
  isEmailVerified?: boolean;

  @BooleanField({ optional: true })
  isPhoneVerified?: boolean;
}
