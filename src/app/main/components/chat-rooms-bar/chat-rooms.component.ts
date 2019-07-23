import { User } from 'src/app/shared/models/user.model';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  InjectionToken
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { DialogService } from '../../services/dialog.service';
import { EditRoomOverlayService } from '../../services/edit-room-overlay.service';
import { EditRoomOverlayComponent } from '../edit-room-overlay/edit-room-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-chat-rooms-bar',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit, OnDestroy {
  rooms$: Observable<Room[]>;
  passwordValidationSubscription: Subscription;
  confirmDialogSubscription: Subscription;
  userSubscription: Subscription;
  user: User;
  @Output() openChatRoom: EventEmitter<Room> = new EventEmitter();

  constructor(
    private roomService: RoomService,
    private router: Router,
    public authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private editRoomOverlayService: EditRoomOverlayService
  ) {}

  ngOnInit() {
    this.rooms$ = this.roomService.getAll();
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.user = user)
    );
  }

  deleteBy(roomKey) {
    this.confirmDialogSubscription = this.dialogService
      .openConfirmDialog()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.roomService.deleteBy(roomKey);
        }

        return;
      });
  }

  add() {
    // this.router.navigateByUrl('/edit');

    const overlayRef = this.editRoomOverlayService.openDialog(
      new ComponentPortal(EditRoomOverlayComponent)
    );
  }

  createPortalInjector(roomToInject: Room) {
    const injectionTokens = new WeakMap();
    injectionTokens.set(
      new InjectionToken<Room>('ROOM_DIALOG_DATA'),
      roomToInject
    );
  }

  // this was a mistake going this way (opening a room by passing data to sibling component via parent)
  // it makes harder to understand the code, and the user cannot bookmark the chatroom
  // i have no time left for refactoring this
  open(room: Room): void {
    if (!this.needPassword(room, this.user.uid)) {
      this.openChatRoom.emit(room);
      return;
    }

    this.passwordValidationSubscription = this.dialogService
      .validatePassword(room.key)
      .subscribe(match => {
        if (match) {
          this.openChatRoom.emit(room);
        } else {
          this.openSnackBar();
        }
      });
  }

  needPassword(room: Room, uid: string): boolean {
    return (
      room.accessibility === 'protected' && !this.isOwner(room.createdBy, uid)
    );
  }

  isOwner(createdBy: string, uid: string): boolean {
    return createdBy === uid;
  }

  openSnackBar() {
    this.snackBar.open('Wrong password!', 'Dismiss', {
      duration: 2000
    });
  }

  ngOnDestroy(): void {
    if (this.passwordValidationSubscription) {
      this.passwordValidationSubscription.unsubscribe();
    }

    if (this.confirmDialogSubscription) {
      this.confirmDialogSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
