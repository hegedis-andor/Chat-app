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
    //on /main route on refresh it throws error, uid 
    this.setUserPresence();
  }

  
  getUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }

  setUserPresence() {
    let userStatusDatabaseRef = this.db.database.ref('users/' + this.getUserUid());

    const isOfflineForDatabase = {
      state: 'offline'
    };

    const isOnlineForDatabase = {
      state: 'online'
    };

    this.db.database.ref('.info/connected').on('value', function (snapshot) {
      if (snapshot.val() == false)
        return;

      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function () {
        userStatusDatabaseRef.update(isOnlineForDatabase);
      })
    })
  }

  getUsers() {
    return this.db.list('users').valueChanges();
  }

}
