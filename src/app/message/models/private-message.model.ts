export interface PrivateMessage {
    messageId?: string;
    senderUid: string;
    senderName: string;
    partnerUid: string;
    partnerName: string;
    content: string;
    timestamp: number;
}
