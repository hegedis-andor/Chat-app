import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsRef: AngularFireList<Room>;
  rooms: Observable<Room[]>;

  constructor(private db: AngularFireDatabase) {
    this.roomsRef = db.list('rooms');
  }

  create(room: Room) {
    this.db.list('/rooms/').push(room);
  }

  getAll() {
    return this.roomsRef
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  getBy(roomKey: string) {
    return this.db
      .object('/rooms/' + roomKey)
      .snapshotChanges()
      .pipe(map(changes => ({ key: changes.key, ...changes.payload.val() })));
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
      accessibility: room.accessibility
    });
  }

  deleteBy(roomKey: string) {
    this.roomsRef.remove(roomKey);
  }

  getRoomPassword(roomKey: string) {
    return this.db
      .object('/rooms/' + roomKey + '/password')
      .snapshotChanges()
      .pipe(map(changes => changes.payload.val()));
  }
}
