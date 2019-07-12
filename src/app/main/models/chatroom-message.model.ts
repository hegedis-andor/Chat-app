export interface ChatroomMessage {
    messageId?: string;
    timestamp: number;
    userId: string;
    username: string;
    content: string;
    roomKey: string;
}
