import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { concat } from 'rxjs';

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

  // not yet working
  getAllBy(ownUid: string, partnerUid: string) {
    const own$ = this.db.list('/privateMessages/' + ownUid, ref => ref.orderByChild('partnerUid').equalTo(partnerUid))
                          .valueChanges();

    const fromPartner$ = this.db.list('/privateMessages/' + partnerUid, ref => ref.orderByChild('partnerUid').equalTo(ownUid))
                          .valueChanges();
    return concat(own$, fromPartner$);
  }

  // this is a quick "solution" for generating id for message, but it should not be used in real produciton
  generateMessageId(timestamp) {
    return btoa(timestamp);
  }
}
