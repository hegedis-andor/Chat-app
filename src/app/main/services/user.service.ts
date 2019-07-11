import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase,
    private authService: AuthService) { 
    this.setUserPresence();
  }

  getUserUid() {
    return this.authService.user.uid;
  }

  setUserPresence() {
    let userStatusDatabaseRef = this.db.database.ref('status/' + this.getUserUid());

    const isOfflineForDatabase = {
      state: 'offline'
    };

    const isOnlineForDatabase = {
      state: 'online'
    };

    this.db.database.ref('.info/connected').on('value', function(snapshot) {
      if (snapshot.val() == false)
        return;

      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        userStatusDatabaseRef.set(isOnlineForDatabase);
      })
    })
  }

  getUsers() {
    return this.db.list('users').valueChanges();
  }

}
