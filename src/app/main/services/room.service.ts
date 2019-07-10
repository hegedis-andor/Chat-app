import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from '../models/room.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsRef: AngularFireList<Room>;
  rooms: Observable<Room[]>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.roomsRef = db.list('rooms');
  }

  create(room: Room) {
    let userid = this.authService.user.uid;
    let roomKey = this.generateRoomKey(userid, room.name);

    this.db.object('/rooms/' + roomKey).set({
      name: room.name,
      accessibility: room.accessibility,
      password: room.password,
      createdBy: userid,
    });
  }

  getAll() {
    return this.roomsRef.snapshotChanges().pipe(
      map(changes => changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getBy(roomKey: string) {
    return this.db.object('/rooms/' + roomKey).snapshotChanges().pipe(
      map(changes => ({ key: changes.key, ...changes.payload.val()}))
    );
  }

  update(room: Room) {
    if (room.accessibility === 'protected') {
      this.db.object('/rooms/' + room.key).update({
        name: room.name,
        accessibility: room.accessibility,
        password: room.password
      });
    } else {
      this.db.object('/rooms/' + room.key).update({
        name: room.name,
        accessibility: room.accessibility,
      });
    }

  }

  delete(roomKey: string) {
    this.roomsRef.remove(roomKey);
  }



  generateRoomKey(userid, roomName) {
    return btoa(userid + roomName);
  }

}
