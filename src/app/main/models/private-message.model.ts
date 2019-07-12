export interface PrivateMessage {
    messageId?: string;
    senderUid: string;
    partnerUid: string;
    partnerName: string;
    content: string;
    timestamp: number;
}
