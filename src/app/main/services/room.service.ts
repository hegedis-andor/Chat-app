import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireAction,
  DatabaseSnapshot
} from '@angular/fire/database';
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

  getAll(): Observable<Room[]> {
    return this.roomsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const room: Room = {
            key: c.payload.key,
            accessibility: c.payload.val().accessibility,
            createdBy: c.payload.val().createdBy,
            name: c.payload.val().name,
            password: c.payload.val().password
          };

          return room;
        })
      )
    );
  }

  getRoomBy(roomKey: string): Observable<Room> {
    return this.db
      .object('/rooms/' + roomKey)
      .snapshotChanges()
      .pipe(
        map((c: AngularFireAction<DatabaseSnapshot<Room>>) => {
          const room: Room = {
            key: c.payload.key,
            accessibility: c.payload.val().accessibility,
            createdBy: c.payload.val().createdBy,
            name: c.payload.val().name,
            password: c.payload.val().password
          };

          return room;
        })
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
      accessibility: room.accessibility
    });
  }

  deleteRoomBy(roomKey: string) {
    this.roomsRef.remove(roomKey);
  }

  getRoomPassword(roomKey: string) {
    return this.db
      .object('/rooms/' + roomKey + '/password')
      .snapshotChanges()
      .pipe(map(changes => changes.payload.val()));
  }
}
