import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Room } from '../../../models/room.model';
import { DialogService } from '../../../services/dialog.service';
import { ModalService } from '../../../services/modal.service';
import { RoomService } from '../../../services/room.service';
import {
  EditRoomOverlayComponent,
  ROOM_DATA
} from '../../edit-room-overlay/edit-room-overlay.component';

@Component({
  selector: 'app-nav-bar-chatroom',
  templateUrl: './nav-bar-chatroom.component.html',
  styleUrls: ['./nav-bar-chatroom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarChatroomComponent implements OnInit, OnDestroy {
  user: User;
  rooms$: Observable<Room[]>;

  passwordValidationSubscription: Subscription;
  confirmDialogSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private roomService: RoomService,
    public authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private injector: Injector,
    private router: Router
  ) {}

  ngOnInit() {
    this.rooms$ = this.roomService.getAll();
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));
  }

  onAddRoom() {
    const injector = this.createInjectorForModal();
    this.modalService.openModal(EditRoomOverlayComponent, injector);
  }

  onEditRoom(room: Room) {
    const injector = this.createInjectorForModal(room);
    this.modalService.openModal(EditRoomOverlayComponent, injector);
  }

  onDeleteRoom(roomKey) {
    this.confirmDialogSubscription = this.dialogService
      .openConfirmDialog()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.roomService.deleteBy(roomKey);
        }

        return;
      });
  }

  onOpenRoom(room: Room): void {
    if (!this.needPassword(room, this.user.uid)) {
      this.router.navigate(['main/', room.accessibility, room.key]);
      return;
    }

    this.passwordValidationSubscription = this.dialogService
      .validatePassword(room.key)
      .subscribe(match => {
        if (match) {
          this.router.navigate(['main/', room.accessibility, room.key]);
        } else {
          this.openSnackBar();
        }
      });
  }

  private needPassword(room: Room, uid: string): boolean {
    return room.accessibility === 'protected' && !this.isOwner(room.createdBy, uid);
  }

  private isOwner(createdBy: string, uid: string): boolean {
    return createdBy === uid;
  }

  private openSnackBar() {
    this.snackBar.open('Wrong password!', 'Dismiss', {
      duration: 2000
    });
  }

  private createInjectorForModal(room?: Room) {
    const injector = Injector.create({
      providers: [{ provide: ROOM_DATA, useValue: room || null }],
      parent: this.injector
    });

    return injector;
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
