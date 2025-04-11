import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConversationParticipantEntity } from "./conversation-participant.entity";
import { CreateConversationParticipantDto } from "./dtos/create-conversation-participant.dto";
import { UpdateConversationParticipantDto } from "./dtos/update-conversation-participant.dto";
import { ConversationParticipantDto } from "./dtos/conversation-participant.dto";
import { DrizzleService } from "modules/drizzle/drizzle.service";
import { conversationParticipants } from "database/schemas/chat.schema";
import { eq } from "drizzle-orm";

@Injectable()
export class ConversationParticipantService {
  constructor(private readonly drizzleService: DrizzleService) { }

  /**
   * Create a new conversation participant
   * @param createParticipantDto - Data for creating the participant
   * @returns The created participant as DTO
   */
  async createParticipant(
    createParticipantDto: CreateConversationParticipantDto,
  ): Promise<ConversationParticipantDto> {
    const db = await this.drizzleService.getDrizzle();

    try {
      const [insertedParticipant] = await db
        .insert(conversationParticipants)
        .values({
          conversation_id: createParticipantDto.conversationId, // Ensure this matches the schema field name
          user_id: createParticipantDto.userId, // Ensure this matches the schema field name
          joined_at: createParticipantDto.joinedAt, // Ensure this matches the schema field name
        })
        .returning();

      if (!insertedParticipant) {
        throw new InternalServerErrorException(
          "Failed to create conversation participant",
        );
      }

      return new ConversationParticipantEntity(insertedParticipant).toDto();
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while creating the conversation participant",
      );
    }
  }

  /**
   * Retrieve a participant by ID
   * @param id - ID of the participant to retrieve
   * @returns The participant as DTO
   */
  async findById(id: number): Promise<ConversationParticipantDto> {
    const db = await this.drizzleService.getDrizzle();

    const participant = await db.query.conversationParticipants.findFirst({
      where: eq(conversationParticipants.id, id),
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return new ConversationParticipantEntity(participant).toDto();
  }

  /**
   * Retrieve all participants for a specific conversation
   * @param conversationId - ID of the conversation
   * @returns List of participants as DTOs
   */
  async findAllByConversation(
    conversationId: number,
  ): Promise<ConversationParticipantDto[]> {
    const db = await this.drizzleService.getDrizzle();

    const participants = await db.query.conversationParticipants.findMany({
      where: eq(conversationParticipants.conversation_id, conversationId), // Use the correct property name
    });

    return participants.map((participant) =>
      new ConversationParticipantEntity(participant).toDto(),
    );
  }

  /**
   * Update a participant's details
   * @param id - ID of the participant to update
   * @param updateParticipantDto - Data to update the participant with
   * @returns The updated participant as DTO
   */
  async updateParticipant(
    id: number,
    updateParticipantDto: UpdateConversationParticipantDto,
  ): Promise<ConversationParticipantDto> {
    const db = await this.drizzleService.getDrizzle();

    await this.findById(id); // Ensure the participant exists

    try {
      // Map DTO properties to table columns
      const updateData = {
        conversation_id: updateParticipantDto.conversationId,
        user_id: updateParticipantDto.userId,
        joined_at: updateParticipantDto.joinedAt,
      };

      const [updatedParticipant] = await db
        .update(conversationParticipants)
        .set(updateData)
        .where(eq(conversationParticipants.id, id))
        .returning();

      if (!updatedParticipant) {
        throw new NotFoundException(
          `Participant with ID ${id} not found after update`,
        );
      }

      return new ConversationParticipantEntity(updatedParticipant).toDto();
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while updating the conversation participant",
      );
    }
  }

  /**
   * Delete a participant by ID
   * @param id - ID of the participant to delete
   */
  async deleteParticipant(id: number): Promise<void> {
    const db = await this.drizzleService.getDrizzle();

    // const participant = await this.findById(id); // Ensure the participant exists

    try {
      const result = await db
        .delete(conversationParticipants)
        .where(eq(conversationParticipants.id, id));

      if (!result) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred while deleting the conversation participant",
      );
    }
  }
}
