import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Room } from '../models/room.model';

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
    const userid = this.authService.user.uid;
    const roomKey = this.generateRoomKey(userid, room.name);

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
      map(changes => ({ key: changes.key, ...changes.payload.val() }))
    );
  }

  update(room: Room) {
    if (room.accessibility === 'protected') {
      this.db.object('/rooms/' + room.key).update({
        name: room.name,
        accessibility: room.accessibility,
        password: room.password
      });

      return;
    }

    this.db.object('/rooms/' + room.key).update({
      name: room.name,
      accessibility: room.accessibility,
    });
  }

  delete(roomKey: string) {
    this.roomsRef.remove(roomKey);
  }

  getRoomPassword(roomKey: string) {
    return this.db.object('/rooms/' + roomKey + '/password').snapshotChanges().pipe(
      map(changes => changes.payload.val())
    );
  }

  // this is a quick way to generate random room key for db, it is not production ready
  generateRoomKey(userid: string, roomName: string) {
    return btoa(userid + roomName);
  }

}
