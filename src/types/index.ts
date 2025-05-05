
export type UserRole = "prospect" | "graduate";

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  institution?: string;
  department?: string;
  field?: string;
  bio?: string;
  researchInterests?: string[];
  acceptingConsultations: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachmentURL?: string;
  attachmentType?: string;
}

export interface ChatRoom {
  id: string;
  participantIds: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
}

export interface SearchFilters {
  role?: UserRole;
  institution?: string;
  department?: string;
  field?: string;
  acceptingConsultations?: boolean;
  query?: string;
}
