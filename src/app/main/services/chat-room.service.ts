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

    this.db.object('/chatroomMessages/' + messageKey).set(message);
  }

  getBy(roomKey: string) {
    return this.db.list('/chatroomMessages', ref => ref.orderByChild('roomKey').equalTo(roomKey)).valueChanges();
  }

  // this is a quick "solution" for generating id for message, but it should not be used in real produciton
  generateMessageId(timestamp) {
    return btoa(timestamp);
  }
}
