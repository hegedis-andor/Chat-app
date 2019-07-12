import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  getUserUid() {
    const currentUser = this.afAuth.auth.currentUser;
    return (currentUser ? currentUser.uid : null);
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

    this.db.database.ref('.info/connected').on('value', snapshot => {
      if (snapshot.val() === false) {
        return;
      }

      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(() => {
        userStatusDatabaseRef.update(isOnlineForDatabase);
      });
    });
  }
}
