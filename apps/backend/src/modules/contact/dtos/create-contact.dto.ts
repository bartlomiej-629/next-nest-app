import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldValueDto } from './custom-field-value.dto';

export class CreateContactDto {
  @ApiProperty({
    description: 'First name of the contact',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({
    description: 'Last name of the contact',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({
    description: 'First name of the contact',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string | null;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @ApiProperty({
    description: 'Avatar URL of the contact',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string | null;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string | null;

  @ApiProperty({
    description: 'Gender of the contact',
    example: 'male',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: string | null;

  @ApiProperty({
    description: 'Status of the contact',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean = false;

  @ApiProperty({
    description: 'Origin of the contact',
    example: 'Referral',
    required: false,
  })
  @IsString()
  @IsOptional()
  origin?: string | null;

  @ApiProperty({
    description: 'Tags associated with the contact',
    example: 'VIP,Important',
    required: false,
  })
  @IsString()
  @IsOptional()
  tags?: string | null;

  @ApiProperty({
    description: 'Custom fields associated with the contact',
    type: [CustomFieldValueDto],
    required: false,
  })
  @IsOptional()
  customFields?: CustomFieldValueDto[] = [];
}
