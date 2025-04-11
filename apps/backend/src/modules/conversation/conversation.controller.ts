import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { UpdateConversationDto } from "./dtos/update-conversation.dto";
import { ConversationDto } from "./dtos/conversation.dto";

@Controller("conversations")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  // Create a new conversation
  @Post()
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<ConversationDto> {
    return this.conversationService.createConversation(createConversationDto);
  }

  // Get a conversation by ID
  @Get(":id")
  async getConversationById(@Param("id") id: number): Promise<ConversationDto> {
    return this.conversationService.findById(id);
  }

  // Get all conversations
  @Get()
  async getAllConversations(): Promise<ConversationDto[]> {
    return this.conversationService.findAll();
  }

  // Update a conversation by ID
  @Put(":id")
  async updateConversation(
    @Param("id") id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<ConversationDto> {
    return this.conversationService.updateConversation(
      id,
      updateConversationDto,
    );
  }

  // Delete a conversation by ID
  @Delete(":id")
  async deleteConversation(@Param("id") id: number): Promise<void> {
    return this.conversationService.deleteConversation(id);
  }
}
