import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private db: AngularFireDatabase) { }

  add(name, accessablitiy, password) {
    this.db.object('/rooms/').update({
      name: name,
      accessablitiy: accessablitiy,
      password: password
    });
  }
}
