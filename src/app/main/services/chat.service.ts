import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { ChatroomMessage } from '../models/chatroom-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private db: AngularFireDatabase) { }

  create(message: ChatroomMessage) {
    const messageKey = this.generateMessageId(message.timestamp);

    this.db.object('/chatroomMessages/' + messageKey).set({
      content: message.content,
      timestamp: message.timestamp,
      userid: message.userId,
      username: message.username,
      roomKey: message.roomKey
    });
  }

  getBy(roomKey: string) {
    return this.db.list('/chatroomMessages', ref => ref.orderByChild('roomKey').equalTo(roomKey)).valueChanges();
  }

  generateMessageId(timestamp) {
    return btoa(timestamp);
  }
}
