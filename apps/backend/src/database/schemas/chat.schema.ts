import {
  serial,
  pgTable,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// 'users' table definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 'conversations' table schema
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  isGroup: boolean("is_group").default(false).notNull(), // Indicates if the conversation is a group conversation
  groupName: varchar("group_name", { length: 256 }), // Optional name for the group
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationParticipants = pgTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversation_id: integer("conversation_id").references(
    () => conversations.id,
  ),
  user_id: integer("user_id").references(() => users.id),
  joined_at: timestamp("joined_at").defaultNow().notNull(),
});
