import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getAll();
  }

  delete(roomKey) {
    this.roomService.delete(roomKey);
  }

  add() {
    this.router.navigateByUrl('/edit');
  }

  open(room: Room): void {
    if (!this.needPassword(room, this.authService.user.uid))
      this.openChatRoom.emit(room);

    //not implemented properly yet
    this.validatePassword();
  }

  validatePassword() {
    this.getPassword().subscribe(data => {
      //check in the database if password correct, then open room
      console.log(data)
      //if (/* correct */) 
        //return
    });
  }

  needPassword(room: Room, uid: string) {
    return (room.accessibility == 'protected') && !(room.createdBy == uid);
  }

  getPassword() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '450px',
      data: {}
    });

    return dialogRef.afterClosed();
  }

}
