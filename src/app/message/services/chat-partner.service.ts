import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { ChatPartner } from './../models/chat-partner.model';

@Injectable({
  providedIn: 'root'
})
export class ChatPartnerService {

  constructor(private db: AngularFireDatabase) { }

  getPartners(uid: string) {
    return this.db.list('/chatPartners/' + uid).valueChanges();
  }

  addPartner(uid: string, partner: ChatPartner) {
    return this.db.object('/chatPartners/' + uid + '/' + partner.uid).update(partner);
  }
}
