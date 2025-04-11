import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Delete,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiPageResponse,
} from '../../decorators';
// import { TranslationService } from '../../shared/services/translation.service';
import { ContactDto } from './dtos/contact.dto';
import { ContactService } from './contact.service';
import { PageDto } from './dtos/page.dto';
import { CreateContactDto } from './dtos/create-contact.dto';
import { PageOptionsDto } from './dtos/page-options.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { CreateCustomFieldDto } from './dtos/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dtos/update-custom-fields.dto';

@Controller('contacts')
@ApiTags('contacts')
export class ContactController {
  private readonly logger = new Logger(
    ContactController.name);

  constructor(
    // private readonly translationService: TranslationService,
    private readonly contactService: ContactService,
  ) { }



  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create contact',
    type: ContactDto,
  })
  createContact(
    @Body(new ValidationPipe({ transform: true })) contactCreate: CreateContactDto,
  ): Promise<ContactDto> {
    this.logger.log('Creating a new contact', contactCreate);
    return this.contactService.createContact(contactCreate);
  }

  @Get()
  // @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageResponse({
    description: 'Get contacts list',
    type: PageDto,
  })
  getContacts(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ContactDto>> {
    this.logger.log('Fetching contacts with options', pageOptionsDto);
    return this.contactService.getContacts(pageOptionsDto);
  }

  @Get(':id')
  // @Auth([RoleType.ADMIN, RoleType.contact])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get contact by ID',
    type: ContactDto,
  })
  getContact(
    @Param('id', ParseIntPipe) contactId: number,
  ): Promise<ContactDto> {
    this.logger.log(`Fetching contact with ID: ${contactId}`);
    return this.contactService.getContact(contactId);
  }

  @Put(':id')
  // @Auth([RoleType.ADMIN, RoleType.contact])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update contact',
    type: ContactDto,
  })
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) contactUpdateDto: UpdateContactDto,
  ): Promise<ContactDto> {
    this.logger.log(`Updating contact with ID: ${id}`, contactUpdateDto);
    return this.contactService.updateContact(id, contactUpdateDto);
  }

  @Delete(':id')
  // @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete contact',
  })
  deleteContact(
    @Param('id', ParseIntPipe) contactId: number,
  ): Promise<void> {
    this.logger.log(`Deleting contact with ID: ${contactId}`);
    return this.contactService.deleteContact(contactId);
  }

  @Post('custom-fields')
  async createCustomField(@Body(new ValidationPipe({ transform: true })) createCustomFieldDto: CreateCustomFieldDto) {
    return this.contactService.createCustomField(createCustomFieldDto);
  }

  @Get('custom-fields')
  async getCustomFields() {
    return this.contactService.getCustomFields();
  }

  @Put('custom-fields/:id')
  async updateCustomField(@Param('id') id: number, @Body() updateCustomFieldDto: UpdateCustomFieldDto) {
    return this.contactService.updateCustomField(id, updateCustomFieldDto);
  }

  @Delete('custom-fields/:id')
  async deleteCustomField(@Param('id') id: number) {
    return this.contactService.deleteCustomField(id);
  }
}
