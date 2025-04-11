import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConversationEntity } from "./conversation.entity";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
import { ConversationDto } from "./dtos/conversation.dto";
import { DrizzleService } from "modules/drizzle/drizzle.service";
import { conversations } from "database/schemas/chat.schema";
import { eq } from "drizzle-orm";

@Injectable()
export class ConversationService {
  constructor(private readonly drizzleService: DrizzleService) { }

  /**
   * Create a new conversation
   * @param createConversationDto - Data Transfer Object for conversation creation
   * @returns The created ConversationEntity
   * @throws InternalServerErrorException if the conversation cannot be created
   */
  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<ConversationDto> {
    const db = await this.drizzleService.getDrizzle();

    try {
      const [insertedConversation] = await db
        .insert(conversations)
        .values({
          ...createConversationDto,
        })
        .returning();

      if (!insertedConversation) {
        throw new InternalServerErrorException("Failed to create conversation");
      }

      return new ConversationEntity(insertedConversation).toDto();
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while creating the conversation",
      );
    }
  }

  /**
   * Find a conversation by its ID
   * @param id - The ID of the conversation
   * @returns The found ConversationDto
   * @throws NotFoundException if the conversation is not found
   */
  async findById(id: number): Promise<ConversationDto> {
    const db = await this.drizzleService.getDrizzle();

    const conversation = await db.query.conversations.findFirst({
      where: eq(conversations.id, id),
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return new ConversationEntity(conversation).toDto();
  }

  /**
   * Get all conversations
   * @returns An array of ConversationDto
   * @throws InternalServerErrorException if an error occurs while retrieving conversations
   */
  async findAll(): Promise<ConversationDto[]> {
    const db = await this.drizzleService.getDrizzle();

    try {
      const conversationsList = await db.query.conversations.findMany();
      return conversationsList.map((conversation) =>
        new ConversationEntity(conversation).toDto(),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while retrieving conversations",
      );
    }
  }

  /**
   * Update a conversation
   * @param id - The ID of the conversation to update
   * @param updateConversationDto - The updated conversation data
   * @returns The updated ConversationDto
   * @throws NotFoundException if the conversation is not found
   * @throws InternalServerErrorException if an error occurs during the update
   */
  async updateConversation(
    id: number,
    updateConversationDto: UpdateConversationDto,
  ): Promise<ConversationDto> {
    const db = await this.drizzleService.getDrizzle();

    // const conversation = await this.findById(id); // Ensure the conversation exists

    try {
      const [updatedConversation] = await db
        .update(conversations)
        .set(updateConversationDto)
        .where(eq(conversations.id, id))
        .returning();

      if (!updatedConversation) {
        throw new NotFoundException(
          `Conversation with ID ${id} not found after update`,
        );
      }

      return new ConversationEntity(updatedConversation).toDto();
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while updating the conversation",
      );
    }
  }

  /**
   * Delete a conversation
   * @param id - The ID of the conversation to delete
   * @returns void
   * @throws NotFoundException if the conversation is not found
   * @throws InternalServerErrorException if an error occurs during deletion
   */
  async deleteConversation(id: number): Promise<void> {
    const db = await this.drizzleService.getDrizzle();

    // const conversation = await this.findById(id); // Ensure the conversation exists

    try {
      const result = await db
        .delete(conversations)
        .where(eq(conversations.id, id));

      if (!result) {
        throw new InternalServerErrorException("Failed to delete conversation");
      }
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while deleting the conversation",
      );
    }
  }
}
