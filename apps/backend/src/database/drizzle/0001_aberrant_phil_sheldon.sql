ALTER TABLE "contact_custom_field_values" DROP CONSTRAINT "contact_custom_field_values_contact_id_contacts_id_fk";
--> statement-breakpoint
ALTER TABLE "contact_custom_field_values" DROP CONSTRAINT "contact_custom_field_values_field_id_contact_custom_fields_id_fk";
--> statement-breakpoint
ALTER TABLE "contact_custom_field_values" ALTER COLUMN "contact_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_custom_field_values" ALTER COLUMN "field_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_custom_field_values" ADD CONSTRAINT "contact_custom_field_values_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_custom_field_values" ADD CONSTRAINT "contact_custom_field_values_field_id_contact_custom_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."contact_custom_fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
