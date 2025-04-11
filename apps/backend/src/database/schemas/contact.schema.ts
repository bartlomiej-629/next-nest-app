import { relations } from "drizzle-orm";
import { serial, pgTable, varchar, integer, boolean, text, timestamp } from "drizzle-orm/pg-core";

// Updated 'contacts' table with new fields
export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }), // Legacy field, could be deprecated
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    phoneNumber: varchar("phone_number", { length: 20 }),
    email: varchar("email", { length: 256 }),
    gender: varchar("gender", { length: 50 }),
    status: boolean("status"), // Represents if the contact is subscribed
    origin: varchar("origin", { length: 256 }), // Represents the origin or source of subscription
    tags: text("tags"), // Admin-only field for tags, stored as a comma-separated list
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// New table for contact custom fields
export const contactCustomFields = pgTable("contact_custom_fields", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }), // Name of the custom field
    type: varchar("type", { length: 50 }), // Type of the custom field (e.g., text, number, date)
});

// New table for storing custom field values for contacts
export const contactCustomFieldValues = pgTable("contact_custom_field_values", {
    id: serial("id").primaryKey(),
    contactId: integer("contact_id").references(() => contacts.id, { onDelete: 'cascade' }).notNull(), // Foreign key to contacts
    fieldId: integer("field_id").references(() => contactCustomFields.id, { onDelete: 'cascade' }).notNull(), // Foreign key to custom fields
    value: text("value"), // The actual value for the custom field
});
export const contactRelations = relations(contacts, ({ many }) => ({
    customFieldValues: many(contactCustomFieldValues),
}))
export const contactCustomFieldsRelations = relations(contactCustomFields, ({ many }) => ({
    customFieldValues: many(contactCustomFieldValues),
}))

// Example of possible relations for custom fields
export const contactCustomFieldRelation = relations(contactCustomFieldValues, ({ one }) => ({
    contact: one(contacts, {
        fields: [contactCustomFieldValues.contactId],
        references: [contacts.id],
    }),
    field: one(contactCustomFields, {
        fields: [contactCustomFieldValues.fieldId],
        references: [contactCustomFields.id],
    }),
}));
