import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { ChatroomMessage } from '../models/chatroom-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  create(message: ChatroomMessage) {
    this.db.list('/chatroomMessages/').push(message);
  }

  getMessagesBy(roomKey: string) {
    return this.db
      .list('/chatroomMessages', ref => ref.orderByChild('roomKey').equalTo(roomKey))
      .valueChanges();
  }
}
