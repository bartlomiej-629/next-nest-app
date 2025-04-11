"use client";
import {
    IconDotsVertical,
    IconChevronDown,
    IconPaperBag,
    IconSquareCheck,
    IconPhone,
    IconMail,
    IconCamera,
    IconMessageCircleBolt,
    IconMessageCircleCog,
} from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { getChatHistory, sendMessage } from "@/services/MessageService";
import { ChatMessage } from "@/mock-data/chatHistoryData";

interface ChatAreaProps {
  chatId: number,
}

export default function ChatArea(props: ChatAreaProps) {
  const {chatId} = props;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchChatHistory() {
      const data = await getChatHistory(chatId);
      setMessages(data);
    }
    fetchChatHistory();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (chatId && newMessage.trim()) {
      const sentMessage = await sendMessage(chatId, newMessage);
      setMessages([...messages, sentMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-2 h-full w-full">
      <div className="border-b border-gray-200 h-[50px] flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/user.png" // Replace with actual avatar image
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">Me</span>
          <IconChevronDown size={18} className="text-gray-500" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-slate-400 rounded p-1 flex items-center">
            <IconSquareCheck size={18} className="text-gray-500 pr-1" />
            <p>Close Case</p>
          </div>
          <IconDotsVertical size={27} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
        </div>
      </div>

      <div className="p-4 space-y-4 h-2/3">
        <div className="flex items-center justify-center">
          <div className="text-gray-500 text-[10px]">Today at 13:02</div>
        </div>
        
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start ${message.isAgent ? 'justify-end' : ''}`}>
            {!message.isAgent && (
              <img
                src={message.avatarUrl || "/assets/user.png"}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-3"
              />
            )}
            <div className="flex flex-col">
              <div className="bg-gray-100 rounded-lg p-2">
                {message.text}
              </div>
            </div>
            {message.isAgent && (
              <img
                src={message.avatarUrl || "/assets/user.png"}
                alt="Avatar"
                className="w-8 h-8 rounded-full ml-3"
              />
            )}
          </div>
        ))}
      </div>

      {/* Reply Section */}
      <div className="p-1 flex items-center justify-center border-b border-gray-200">
        <div className="flex space-x-2 border border-gray-200 rounded-md p-1">
          <button className="bg-purple-600 text-white px-1 py-1 rounded-sm" onClick={handleSendMessage}>
            Reply
          </button>
          <button className="text-gray-500 px-1 py-1 rounded-sm">
            Notes
          </button>
        </div>
      </div>
      
      <div className="flex-col items-center space-x-2">
        <textarea 
          rows={5} 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full focus-visible:outline-none" />
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2">
              <IconPhone size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
              <IconMail size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
              <IconCamera size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
              <IconMessageCircleBolt size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
              <IconMessageCircleCog size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
          </div>
          <div className="flex items-center justify-center bg-purple-500 text-white px-2 py-1 rounded-md">
            <IconPaperBag size={20} className="text-white" />
            <span className="text-xs">Reply via Instagram</span>
          </div>
        </div>
      </div>
    </div>
  );
}
