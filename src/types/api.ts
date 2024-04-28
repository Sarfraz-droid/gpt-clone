export interface Chats {
  id: number;
  user_id: string;
  createdAt: Date;
  title: string;
}

export interface TransformedChats {
  text: string;
  children: Chats[];
}

export interface Messages {
  id: number;
  user_id: string;
  userMessage: string;
  gptResponse: string;
  chatId: number;
}

export interface ISelectedChat {
  edit: boolean;
  showDropdown: boolean;
  chat: Chats | null;
}
