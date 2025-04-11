import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  // NotFoundException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ConversationParticipantService } from "./conversation-participant.service";
import { CreateConversationParticipantDto } from "./dtos/create-conversation-participant.dto";
import { UpdateConversationParticipantDto } from "./dtos/update-conversation-participant.dto";
import { ConversationParticipantDto } from "./dtos/conversation-participant.dto";

@Controller("conversation-participants")
export class ConversationParticipantController {
  constructor(
    private readonly participantService: ConversationParticipantService,
  ) { }

  /**
   * Create a new conversation participant
   * @param createParticipantDto - Data for creating the participant
   * @returns The created participant as DTO
   */
  @Post()
  async create(
    @Body() createParticipantDto: CreateConversationParticipantDto,
  ): Promise<ConversationParticipantDto> {
    return this.participantService.createParticipant(createParticipantDto);
  }

  /**
   * Retrieve a participant by ID
   * @param id - ID of the participant to retrieve
   * @returns The participant as DTO
   */
  @Get(":id")
  async findById(@Param("id") id: number): Promise<ConversationParticipantDto> {
    return this.participantService.findById(id);
  }

  /**
   * Retrieve all participants for a specific conversation
   * @param conversationId - ID of the conversation
   * @returns List of participants as DTOs
   */
  @Get("conversation/:conversationId")
  async findAllByConversation(
    @Param("conversationId") conversationId: number,
  ): Promise<ConversationParticipantDto[]> {
    return this.participantService.findAllByConversation(conversationId);
  }

  /**
   * Update a participant's details
   * @param id - ID of the participant to update
   * @param updateParticipantDto - Data to update the participant with
   * @returns The updated participant as DTO
   */
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateParticipantDto: UpdateConversationParticipantDto,
  ): Promise<ConversationParticipantDto> {
    return this.participantService.updateParticipant(id, updateParticipantDto);
  }

  /**
   * Delete a participant by ID
   * @param id - ID of the participant to delete
   * @returns Status message
   */
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: number): Promise<void> {
    await this.participantService.deleteParticipant(id);
  }
}
