import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  rooms$;

  constructor(
    private roomService: RoomService,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getRooms();
  }

  delete(roomId) {
    this.roomService.delete(roomId);
  }

}
