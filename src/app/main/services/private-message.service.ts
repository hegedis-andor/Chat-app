import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { PrivateMessage } from './../models/private-message.model';

@Injectable({
  providedIn: 'root'
})
export class PrivateMessageService {

  constructor(private db: AngularFireDatabase) { }

  create(message: PrivateMessage) {
    const messageId = this.generateMessageId(message.timestamp);
    this.db.object('/privateMessages/' + message.senderUid + '/' + messageId).update(message);
  }

  getAllBy(uid: string, partnerUid: string) {
    return this.db.list('/privateMessages/' + uid, ref => ref.orderByChild('partnerUid').equalTo(partnerUid)).valueChanges();
  }

  // this is a quick "solution" for generating id for message, but it should not be used in real produciton
  generateMessageId(timestamp) {
    return btoa(timestamp);
  }
}
