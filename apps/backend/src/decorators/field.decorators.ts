import { applyDecorators } from "@nestjs/common";
import type { ApiPropertyOptions } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
  ValidateNested,
} from "class-validator";

import { supportedLanguageCount } from "../constants";
import type { Constructor } from "../types";
import { ApiEnumProperty, ApiUUIDProperty } from "./property.decorators";
import {
  PhoneNumberSerializer,
  ToArray,
  ToBoolean,
  ToLowerCase,
  ToUpperCase,
} from "./transform.decorators";
import {
  IsNullable,
  IsPassword,
  IsPhoneNumber,
  IsTmpKey as IsTemporaryKey,
  IsUndefinable,
} from "./validator.decorators";

type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Base interface for field options.
 */
interface IFieldOptions {
  /** Whether to apply the decorator to each element of an array. */
  each?: boolean;
  /** Whether to include Swagger documentation. */
  swagger?: boolean;
  /** Whether the field can be null. */
  nullable?: boolean;
  /** Validation groups to which this field belongs. */
  groups?: string[];
  /** Whether the field is optional. */
  optional?: boolean;
  /** Error message to be used when the field is not valid. */
  message?: string;
}

/**
 * Interface for number field options.
 */
interface INumberFieldOptions extends IFieldOptions {
  /** Minimum value for the number. */
  min?: number;
  /** Maximum value for the number. */
  max?: number;
  /** Whether the number should be an integer. */
  int?: boolean;
  /** Whether the number should be positive. */
  isPositive?: boolean;
}

/**
 * Interface for string field options.
 */
interface IStringFieldOptions extends IFieldOptions {
  /** Minimum length of the string. */
  minLength?: number;
  /** Maximum length of the string. */
  maxLength?: number;
  /** Whether to convert the string to lowercase. */
  toLowerCase?: boolean;
  /** Whether to convert the string to uppercase. */
  toUpperCase?: boolean;
}

type IClassFieldOptions = IFieldOptions;
type IBooleanFieldOptions = IFieldOptions;
type IEnumFieldOptions = IFieldOptions;

/**
 * Decorator for number fields.
 * @param options Configuration options for the number field.
 */
export function NumberField(
  options: Omit<ApiPropertyOptions, "type"> & INumberFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    Type(() => Number),
    IsNumber({}, { message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: Number,
        ...options,
      }),
    );
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.int) {
    decorators.push(IsInt({ each: options.each }));
  } else {
    decorators.push(IsNumber({}, { each: options.each }));
  }

  if (typeof options.min === "number") {
    decorators.push(Min(options.min, { each: options.each }));
  }

  if (typeof options.max === "number") {
    decorators.push(Max(options.max, { each: options.each }));
  }

  if (options.isPositive) {
    decorators.push(IsPositive({ each: options.each }));
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for string fields.
 * @param options Configuration options for the string field.
 */
export function StringField(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    Type(() => String),
    IsString({ each: options.each, message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: String,
        ...options,
        isArray: options.each,
      }),
    );
  }

  const minLength = options.minLength || 1;

  decorators.push(MinLength(minLength, { each: options.each }));

  if (options.maxLength) {
    decorators.push(MaxLength(options.maxLength, { each: options.each }));
  }

  if (options.toLowerCase) {
    decorators.push(ToLowerCase());
  }

  if (options.toUpperCase) {
    decorators.push(ToUpperCase());
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for password fields.
 * @param options Configuration options for the password field.
 */
export function PasswordField(
  options: Omit<ApiPropertyOptions, "type" | "minLength"> &
    IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    StringField({ ...options, minLength: 6, message: options.message }),
    IsPassword(),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for boolean fields.
 * @param options Configuration options for the boolean field.
 */
export function BooleanField(
  options: Omit<ApiPropertyOptions, "type"> & IBooleanFieldOptions = {},
): PropertyDecorator {
  const decorators = [ToBoolean(), IsBoolean({ message: options.message })];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: Boolean,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for translation fields.
 * @param options Configuration options for the translation field.
 */
export function TranslationsField(
  options: RequireField<Omit<ApiPropertyOptions, "isArray">, "type"> &
    IFieldOptions,
): PropertyDecorator {
  const decorators = [
    ArrayMinSize(supportedLanguageCount),
    ArrayMaxSize(supportedLanguageCount),
    ValidateNested({
      each: true,
    }),
    Type(() => options.type as FunctionConstructor),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        isArray: true,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for temporary key fields.
 * @param options Configuration options for the temporary key field.
 */
export function TmpKeyField(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    StringField(options),
    IsTemporaryKey({ each: options.each }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: String,
        ...options,
        isArray: options.each,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for enum fields.
 * @param getEnum Function that returns the enum type.
 * @param options Configuration options for the enum field.
 */
export function EnumField<TEnum extends object>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, "type" | "enum" | "enumName" | "isArray"> &
    IEnumFieldOptions = {},
): PropertyDecorator {
  const enumValue = getEnum();
  const decorators = [
    IsEnum(enumValue, { each: options.each, message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiEnumProperty(getEnum, { ...options, isArray: options.each }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for class fields.
 * @param getClass Function that returns the class type.
 * @param options Configuration options for the class field.
 */
export function ClassField<TClass extends Constructor>(
  getClass: () => TClass,
  options: Omit<ApiPropertyOptions, "type"> & IClassFieldOptions = {},
): PropertyDecorator {
  const classValue = getClass();

  const decorators = [
    Type(() => classValue),
    ValidateNested({ each: options.each, message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  } else if (options.required !== false) {
    decorators.push(IsDefined());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: () => classValue,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for email fields.
 * @param options Configuration options for the email field.
 */
export function EmailField(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    IsEmail(),
    StringField({ toLowerCase: true, ...options }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: String,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for phone number fields.
 * @param options Configuration options for the phone number field.
 */
export function PhoneField(
  options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    IsPhoneNumber({ message: options.message }),
    PhoneNumberSerializer(),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: String,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for UUID fields.
 * @param options Configuration options for the UUID field.
 */
export function UUIDField(
  options: Omit<ApiPropertyOptions, "type" | "format" | "isArray"> &
    IFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    Type(() => String),
    IsUUID("4", { each: options.each, message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(ApiUUIDProperty(options));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for URL fields.
 * @param options Configuration options for the URL field.
 */
export function URLField(
  options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [
    StringField(options),
    IsUrl({}, { each: true, message: options.message }),
  ];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }));
  } else {
    decorators.push(NotEquals(null, { each: options.each }));
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for date fields.
 * @param options Configuration options for the date field.
 */
export function DateField(
  options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {},
): PropertyDecorator {
  const decorators = [Type(() => Date), IsDate({ message: options.message })];

  if (!!options.optional) {
    decorators.unshift(IsUndefinable());
  }

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiProperty({
        ...(!!options.optional ? { required: false } : {}),
        type: Date,
        ...options,
      }),
    );
  }

  return applyDecorators(...decorators);
}
