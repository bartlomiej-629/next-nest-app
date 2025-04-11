export interface ChatMessage {
  id: number;
  text: string;
  isAgent: boolean;
  avatarUrl: string;
}

export const chatHistoryData: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      text: "Hey, are you available?",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 2,
      text: "Yes, I am.",
      isAgent: true,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 3,
      text: "Okay.",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
  ],
  2: [
    {
      id: 1,
      text: "Please update the document.",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 2,
      text: "Will do!",
      isAgent: true,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 3,
      text: "Thanks!",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
  ],
  3: [
    {
      id: 1,
      text: "Hello, how are you doing?",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 2,
      text: "I am fine, thanks for your asking. How about you?",
      isAgent: true,
      avatarUrl: "/assets/user.png",
    },
    {
      id: 3,
      text: "I am good. Thanks!",
      isAgent: false,
      avatarUrl: "/assets/user.png",
    },
  ],
};
