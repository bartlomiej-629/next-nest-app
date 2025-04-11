import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomFieldValueDto {
    @ApiProperty({
        description: 'The name of the custom field',
        example: 'Priority',
    })
    @IsString()
    @IsNotEmpty()
    name: string = '';

    @ApiProperty({
        description: 'The value of the custom field (e.g., text, number, etc.)',
        example: 'text',
        required: false,
    })
    @IsString()
    @IsOptional()
    value?: string;
}