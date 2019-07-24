import { User } from 'src/app/shared/models/user.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { DialogService } from '../../services/dialog.service';
import { EditRoomOverlayComponent } from '../edit-room-overlay/edit-room-overlay.component';
import { ModalService } from '../../services/modal.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ROOM_DATA } from '../../room-data.token';

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
    public authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.rooms$ = this.roomService.getAll();
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));
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

  manageRoom(room?: Room) {
    const injector = Injector.create([{ provide: ROOM_DATA, useValue: room || null }]);
    this.modalService.openModal(new ComponentPortal(EditRoomOverlayComponent, null, injector));
  }

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
    return room.accessibility === 'protected' && !this.isOwner(room.createdBy, uid);
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
