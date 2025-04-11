CREATE TABLE IF NOT EXISTS "contact_custom_field_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" integer,
	"field_id" integer,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_custom_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"type" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"phone_number" varchar(20),
	"email" varchar(256),
	"gender" varchar(50),
	"status" boolean,
	"origin" varchar(256),
	"tags" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_custom_field_values" ADD CONSTRAINT "contact_custom_field_values_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_custom_field_values" ADD CONSTRAINT "contact_custom_field_values_field_id_contact_custom_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."contact_custom_fields"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
