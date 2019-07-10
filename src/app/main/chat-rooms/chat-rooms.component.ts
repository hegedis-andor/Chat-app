import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../services/room.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {
  rooms$: Observable<Room[]>;
  @Output() openChatRoom: EventEmitter<Room> = new EventEmitter();

  constructor(
    private roomService: RoomService,
    private router: Router,
    public authService: AuthService,
    ) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getAll();
  }

  delete(roomId) {
    this.roomService.delete(roomId);
  }

  add() {
    this.router.navigateByUrl('/edit');
  }

  open(room: Room) {
    this.openChatRoom.emit(room);
  }

}
