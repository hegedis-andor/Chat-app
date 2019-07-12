import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.setUserPresence();
  }


  getUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }

  setUserPresence() {
    const uid = this.getUserUid();
    if (!uid) {
      return;
    }

    const userStatusDatabaseRef = this.db.database.ref('users/' + uid);

    const isOfflineForDatabase = {
      state: 'offline'
    };

    const isOnlineForDatabase = {
      state: 'online'
    };

    this.db.database.ref('.info/connected').on('value', function(snapshot) {
      if (snapshot.val() == false) {
        return;
      }

      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function() {
        userStatusDatabaseRef.update(isOnlineForDatabase);
      });
    });
  }

  getUsers() {
    return this.db.list('users').valueChanges();
  }

  getOnlineUsers() {
    return this.db.list('/users', ref => ref.orderByChild('state').equalTo('online')).valueChanges();
  }

  getOfflineUsers() {
    return this.db.list('/users', ref => ref.orderByChild('state').equalTo('offline')).valueChanges();
  }
}
