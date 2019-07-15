import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { PrivateMessage } from '../models/private-message.model';

@Injectable({
  providedIn: 'root'
})
export class PrivateMessageService {

  constructor(private db: AngularFireDatabase) { }

  create(message: PrivateMessage) {
    const messageNode = this.getPartnersId(message.senderUid, message.partnerUid);
    return this.db.list('/privateMessages/' + messageNode).push(message);
  }

  getAllBy(senderUid: string, partnerUid: string) {
    const messageNode = this.getPartnersId(senderUid, partnerUid);
    return this.db.list('/privateMessages/' + messageNode, ref => ref.orderByChild('timestamp')).valueChanges();
  }

  getPartnersId(senderUid: string, receiverUid: string): string {
    if (senderUid < receiverUid) {
      return senderUid + receiverUid;
    }

    return receiverUid + senderUid;
  }
}
