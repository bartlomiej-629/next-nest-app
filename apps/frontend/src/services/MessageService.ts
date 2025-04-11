import { chatHistoryData, ChatMessage } from "@/mock-data/chatHistoryData";

export function getChatHistory(chatId: number): Promise<ChatMessage[]> {
  return new Promise((resolve) => {
    const history = chatHistoryData[chatId] || [];
    setTimeout(() => resolve(history), 500); // Simulate async call with delay
  });
}

export function sendMessage(
  chatId: number,
  message: string,
): Promise<ChatMessage> {
  return new Promise((resolve) => {
    const newMessage: ChatMessage = {
      id: Math.random(), // Generate unique ID
      text: message,
      isAgent: true,
      avatarUrl: "/assets/user.png",
    };
    if (chatHistoryData[chatId]) chatHistoryData[chatId].push(newMessage);
    else {
      chatHistoryData[chatId] = [];
      chatHistoryData[chatId].push(newMessage);
    }

    setTimeout(() => resolve(newMessage), 500); // Simulate async call with delay
  });
}
