import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object('users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signUpWithEmailAndPassword(username: string, email: string, password: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credential => {
      const user = this.afAuth.auth.currentUser;
      user.updateProfile({
        displayName: username
      })
      .then(_ => this.updateUserData(credential.user));
    });
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    this.router.navigateByUrl('/main');

    return this.db.object('users/' + user.uid).update(data);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

}































/*user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute )
  {
    this.user$ = afAuth.authState;
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get user() {
    return this.user$;
  }*/
