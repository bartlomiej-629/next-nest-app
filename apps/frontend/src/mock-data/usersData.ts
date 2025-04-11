export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  isUnassigned: boolean;
  chatId: number;
}

export const usersData: User[] = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "/assets/user.png",
    lastMessage: "Hey, are you available?",
    lastMessageTime: "12:30 PM",
    isUnassigned: true,
    chatId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "/assets/user.png",
    lastMessage: "Please update the document.",
    lastMessageTime: "9:15 AM",
    isUnassigned: false,
    chatId: 2,
  },
  {
    id: 3,
    name: "Sam Wilson",
    avatarUrl: "/assets/user.png",
    lastMessage: "Meeting is scheduled.",
    lastMessageTime: "Yesterday",
    isUnassigned: true,
    chatId: 3,
  },
];
