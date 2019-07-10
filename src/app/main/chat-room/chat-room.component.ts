import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  rooms$;

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

}
