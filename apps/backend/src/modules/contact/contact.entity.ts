import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "../../decorators";
import { ContactDto } from "./dtos/contact.dto";

@UseDto(ContactDto)
export class ContactEntity extends AbstractEntity<ContactDto> {

  firstName!: string | null;

  lastName!: string | null;

  name!: string | null;

  email!: string | null;

  phone?: string | null;

  avatar?: string | null;

  customFields?: { name: string, value: string }[];

  constructor(partial: Partial<ContactEntity> = {}) {
    super();
    Object.assign(this, partial);
    this.name = `${this.firstName} ${this.lastName}`;
  }

  toDto(): ContactDto {
    return new ContactDto(this);
  }
}
export function mapToContactEntity(data: {
  id: number;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  gender: string | null;
  status: boolean | null;
  origin: string | null;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
}): ContactEntity {
  return new ContactEntity({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phoneNumber,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    // Add other fields as necessary
  });
}
