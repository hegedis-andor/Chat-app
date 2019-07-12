import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private db: AngularFireDatabase) {
  }

  getOnlineUsers() {
    return this.db.list('/users', ref => ref.orderByChild('state').equalTo('online')).valueChanges();
  }

  getOfflineUsers() {
    return this.db.list('/users', ref => ref.orderByChild('state').equalTo('offline')).valueChanges();
  }

}
