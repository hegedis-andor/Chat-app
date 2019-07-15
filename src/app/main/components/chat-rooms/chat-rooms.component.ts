import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-chat-rooms-bar',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit, OnDestroy {

  rooms$: Observable<Room[]>;
  validationSubscritption: Subscription;
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

  deleteBy(roomKey) {
    this.roomService.deleteBy(roomKey);
  }

  add() {
    this.router.navigateByUrl('/edit');
  }

  open(room: Room): void {
    if (!this.needPassword(room, this.authService.user.uid)) {
      this.openChatRoom.emit(room);
      return;
    }

    this.validationSubscritption = this.validatePassword(room.key)
      .subscribe(match => {
        if (match) {
          this.openChatRoom.emit(room);
        } else {
          console.log('not match');
        }
    });

  }

  needPassword(room: Room, uid: string): boolean {
    return (room.accessibility === 'protected') && !(room.createdBy === uid);
  }

  validatePassword(roomKey: string): Observable<boolean> {
    return this.getPasswordFromDialog().pipe(
      switchMap(userInput => {
        return this.roomService.getRoomPassword(roomKey).pipe(
          map(password => {
            if (userInput === password) {
              return true;
            }

            return false;
          }));
      })
    );
  }



  getPasswordFromDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '30rem',
    });

    return dialogRef.afterClosed();
  }

  ngOnDestroy(): void {
    if (this.validationSubscritption) {
      this.validationSubscritption.unsubscribe();
    }
  }
}
