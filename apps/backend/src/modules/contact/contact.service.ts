import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ContactEntity } from "./contact.entity";
import { ContactDto } from "./dtos/contact.dto";
import { PageDto } from "./dtos/page.dto";
import { DrizzleService } from "modules/drizzle/drizzle.service";
import { contactCustomFields, contactCustomFieldValues, contacts } from "database/schemas/contact.schema";
import { CreateContactDto } from "./dtos/create-contact.dto";
import { asc, eq } from "drizzle-orm";
import { PageOptionsDto } from "./dtos/page-options.dto";
import { UpdateContactDto } from "./dtos/update-contact.dto";
import { CreateCustomFieldDto } from "./dtos/create-custom-field.dto";
import { UpdateCustomFieldDto } from "./dtos/update-custom-fields.dto";
import { CustomFieldValueDto } from "./dtos/custom-field-value.dto";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly drizzleService: DrizzleService) { }
  /**
   * Helper method to insert custom fields for a contact
   * @param tx - Transaction object from Drizzle ORM
   * @param customFields - Custom fields data to insert
   * @param contactId - ID of the contact for which custom fields are being inserted
   */
  private async insertCustomFields(
    tx: any,
    customFields: CustomFieldValueDto[],
    contactId: number,
  ): Promise<void> {
    // Fetch custom field IDs based on the names
    const customFieldRecords = await tx.query.contactCustomFields.findMany({
      columns: { name: true, id: true },
    });
    const customFieldNames = customFields.map(field => field.name);

    const fieldIdMap = new Map(
      customFieldRecords.filter((field: { name: string, id: number }) => customFieldNames.includes(field.name ?? ''))
        .map((field: { name: string, id: number }) => [field.name, field.id])
    );

    for (const field of customFields) {
      const fieldId = fieldIdMap.get(field.name);
      if (fieldId) {
        await tx.insert(contactCustomFieldValues).values({
          contactId: contactId,
          fieldId: fieldId,
          value: field.value,
        });
      } else {
        this.logger.warn(`Custom field '${field.name}' not found`);
      }
    }
  }
  /**
   * Create a new contact
   * @param createContactDto - Data Transfer Object for contact registration
   * @returns The created ContactEntity
   * @throws BadRequestException if the contact cannot be created
   */
  async createContact(createContactDto: CreateContactDto): Promise<ContactEntity> {
    try {
      const db = await this.drizzleService.getDrizzle(); // Initialize your Drizzle ORM instance

      const createdContact = await db.transaction(async (tx) => {
        // Insert the contact
        const [insertedContact] = await tx.insert(contacts).values({
          ...createContactDto,
          name: `${createContactDto.firstName} ${createContactDto.lastName}`,
        }).returning();

        if (!insertedContact) {
          throw new BadRequestException('Contact could not be created');
        }
        this.logger.log('Inserted contact', createContactDto.customFields);

        // Insert custom field values if provided
        if (createContactDto.customFields) {
          await this.insertCustomFields(tx, createContactDto.customFields, insertedContact.id);
        }
        return insertedContact; // Return the created contact
      });

      this.logger.log('Contact created successfully', JSON.stringify(createdContact));
      return new ContactEntity(createdContact);
    } catch (error) {
      this.logger.error('Failed to create contact', error.stack);
      throw new InternalServerErrorException('An error occurred while creating the contact');
    }
  }
  /**
   * Retrieve paginated list of contacts
   * @param pageOptionsDto - Data Transfer Object for pagination options
   * @returns Paginated list of contacts
   */
  async getContacts(pageOptionsDto: PageOptionsDto): Promise<PageDto<ContactDto>> {
    try {
      const db = await this.drizzleService.getDrizzle();
      const contactsList = await db.query.contacts
        .findMany({
          offset: pageOptionsDto.page * pageOptionsDto.limit,
          limit: pageOptionsDto.limit,
          orderBy: [asc(contacts.createdAt)],
          with: {
            customFieldValues: {
              columns: {
                id: false,
                contactId: false,
                fieldId: false,
              },
              with: {
                field: {
                  columns: {
                    id: false,
                  }
                }
              },
            },
          }
        })

      return new PageDto<ContactDto>(contactsList, { page: pageOptionsDto.page, limit: pageOptionsDto.limit });
    } catch (error) {
      this.logger.error('Failed to get contacts', error.stack);
      throw new InternalServerErrorException('An error occurred while retrieving contacts');
    }
  }
  /**
   * Retrieve a single contact by ID
   * @param contactId - The ID of the contact to retrieve
   * @returns ContactDto
   * @throws NotFoundException if the contact is not found
   */
  async getContact(contactId: number): Promise<ContactDto> {
    try {
      const db = await this.drizzleService.getDrizzle();
      const contact = await db.query.contacts
        .findFirst({
          where: eq(contacts.id, contactId),
          with: {
            customFieldValues: {
              columns: {
                id: false,
                contactId: false,
                fieldId: false,
              },
              with: {
                field: {
                  columns: {
                    id: false,
                  }
                }
              },
            },
          }
        })

      if (!contact) {
        throw new NotFoundException(`Contact with ID ${contactId} not found`);
      }
      return contact;
    } catch (error) {
      this.logger.error(`Failed to get contact with ID ${contactId}`, error.stack);
      throw new InternalServerErrorException('An error occurred while retrieving the contact');
    }
  }
  /**
   * Update a contact by ID
   * @param contactId - The ID of the contact to update
   * @param contactUpdateDto - The updated contact data
   * @returns The updated contactDto
   * @throws NotFoundException if the contact is not found
   */
  async updateContact(contactId: number, contactUpdateDto: UpdateContactDto): Promise<ContactDto> {
    try {
      const db = await this.drizzleService.getDrizzle();

      const updatedContact = await db.transaction(async (tx) => {
        this.logger.log('Updating a contact', contactId, JSON.stringify(contactUpdateDto));

        // Check if the contact exists
        const contact = await tx.query.contacts.findFirst({ where: eq(contacts.id, contactId) });

        if (!contact) {
          throw new NotFoundException(`Contact with ID ${contactId} not found`);
        }
        // Update the contact
        const [updated] = await tx.update(contacts)
          .set({
            ...contact,
            ...contactUpdateDto,
            updatedAt: new Date(),
          })
          .where(eq(contacts.id, contactId))
          .returning();

        if (!updated) {
          throw new InternalServerErrorException('Failed to update contact');
        }
        // Delete existing custom field values
        await tx.delete(contactCustomFieldValues).where(eq(contactCustomFieldValues.contactId, contactId));

        // Insert new custom field values if provided
        if (contactUpdateDto.customFields) {
          await this.insertCustomFields(tx, contactUpdateDto.customFields, contactId);
        }
        return updated; // Return the updated contact
      });

      this.logger.log(`Contact with ID ${contactId} updated successfully`, updatedContact);
      return updatedContact;
    } catch (error) {
      this.logger.error(`Failed to update contact with ID ${contactId}`, error.stack);
      throw new InternalServerErrorException('An error occurred while updating the contact');
    }
  }
  /**
   * Delete a contact by ID
   * @param contactId - The ID of the contact to delete
   * @returns void
   * @throws NotFoundException if the contact is not found
   */
  async deleteContact(contactId: number): Promise<void> {
    const db = await this.drizzleService.getDrizzle();

    await db.transaction(async (tx) => {
      this.logger.log('Deleting contact', contactId);

      // Check if the contact exists
      const contact = await tx.query.contacts.findFirst({ where: eq(contacts.id, contactId) });

      if (!contact) {
        throw new NotFoundException(`Contact with ID ${contactId} not found`);
      }
      // Delete custom field values
      await tx.delete(contactCustomFieldValues).where(eq(contactCustomFieldValues.contactId, contactId));

      // Delete the contact
      await tx.delete(contacts).where(eq(contacts.id, contactId));
    });

    this.logger.log(`Contact with ID ${contactId} and its custom field values deleted successfully`);
  }
  /**
   * Create a new custom field
   * @param createCustomFieldDto - Data Transfer Object for creating a custom field
   * @returns The created custom field
   */
  async createCustomField(createCustomFieldDto: CreateCustomFieldDto) {
    this.logger.log('Creating custom field', JSON.stringify(createCustomFieldDto));
    try {
      const db = await this.drizzleService.getDrizzle();
      const newField = await db.insert(contactCustomFields).values(createCustomFieldDto).returning();
      return newField[0];
    } catch (error) {
      this.logger.error('Failed to create custom field', error.stack);
      throw new InternalServerErrorException('An error occurred while creating the custom field');
    }
  }
  /**
   * Retrieve all custom fields
   * @returns List of custom fields
   */
  async getCustomFields() {
    try {
      const db = await this.drizzleService.getDrizzle();
      return await db.query.contactCustomFields.findMany();
    } catch (error) {
      this.logger.error('Failed to retrieve custom fields', error.stack);
      throw new InternalServerErrorException('An error occurred while retrieving custom fields');
    }
  }
  /**
   * Update a custom field by ID
   * @param id - The ID of the custom field to update
   * @param updateCustomFieldDto - The updated custom field data
   * @returns The updated custom field
   */
  async updateCustomField(id: number, updateCustomFieldDto: UpdateCustomFieldDto) {
    try {
      const db = await this.drizzleService.getDrizzle();
      const updatedField = await db.update(contactCustomFields)
        .set(updateCustomFieldDto)
        .where(eq(contactCustomFields.id, id))
        .returning();
      return updatedField[0];
    } catch (error) {
      this.logger.error(`Failed to update custom field with ID ${id}`, error.stack);
      throw new InternalServerErrorException('An error occurred while updating the custom field');
    }
  }
  /**
   * Delete a custom field by ID
   * @param id - The ID of the custom field to delete
   * @returns void
   * @throws InternalServerErrorException if an error occurs while deleting the custom field
   */
  async deleteCustomField(id: number) {
    try {
      const db = await this.drizzleService.getDrizzle();
      await db.delete(contactCustomFields).where(eq(contactCustomFields.id, id));
    } catch (error) {
      this.logger.error(`Failed to delete custom field with ID ${id}`, error.stack);
      throw new InternalServerErrorException('An error occurred while deleting the custom field');
    }
  }
}
