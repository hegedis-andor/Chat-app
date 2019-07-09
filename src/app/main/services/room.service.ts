import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsRef: AngularFireList<any>;
  rooms: Observable<Room[]>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
    ) { 
      this.roomsRef = db.list('rooms');
    }

  add(room: Room) {
    let userid = localStorage.getItem('userid');
    let roomId = this.generateRoomid(userid, room.name);

    this.db.object('/rooms/' + roomId).set({
      name: room.name,
      accessablitiy: room.accessablitiy,
      password: room.password,
      createdBy: userid,
      messages: []
    });
  }

  getRooms() {
    return this.roomsRef.snapshotChanges().pipe(
      map( changes => changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  };

  delete(roomId: string) {
    this.roomsRef.remove(roomId);
  }

  generateRoomid(userid, roomName) {
    return btoa(userid + roomName);
  }


}
