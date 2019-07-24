import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { ROOM_OVERLAY_DATA } from '../../room-overlay.tokens';
import { EditRoomOverlayRef } from '../../edit-room-overlayref';

@Component({
  selector: 'app-edit-room-overlay',
  templateUrl: './edit-room-overlay.component.html',
  styleUrls: ['./edit-room-overlay.component.scss']
})
export class EditRoomOverlayComponent implements OnInit, OnDestroy {
  accessTypes = ['public', 'private', 'protected'];

  chatroomForm: FormGroup;
  accessability: string;
  isFormValid = true;
  isRoomSaved: boolean;
  roomKey: string;
  showPassword: boolean;
  subscription: Subscription;
  user: User;
  userSubscription: Subscription;

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    @Inject(ROOM_OVERLAY_DATA) private roomForEdit: Room,
    @Inject(EditRoomOverlayRef) private editRoomOverlayRef: EditRoomOverlayRef
  ) {
    let room;
    if (!this.roomForEdit) {
      room = {};
    } else {
      room = this.roomForEdit;
    }

    this.chatroomForm = new FormGroup({
      roomName: new FormControl(room.name, [Validators.required, Validators.minLength(4)]),
      accessibility: new FormControl(room.accessibility || this.accessTypes[0], [
        Validators.required
      ]),
      password: new FormControl(room.password)
    });
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));
  }

  save() {
    if (this.chatroomForm.invalid) {
      this.isFormValid = false;
      this.hideNotification();
      return;
    }

    if (this.roomForEdit) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const room = this.initRoomFromForm();

    this.roomService.create(room); // Not checked if it succeeded
    this.showSuccessMessage();
    this.navigateToMainPage();
  }

  update() {
    const room = this.initRoomFromForm();
    room.key = this.roomForEdit.key;

    this.roomService.update(room); // Not checked if it succeeded
    this.showSuccessMessage();
    this.navigateToMainPage();
  }

  initRoomFromForm(): Room {
    const userUid = this.user.uid;

    const room: Room = {
      name: this.roomName.value,
      password: this.password.value === '' ? null : this.password.value,
      accessibility: this.accessibility.value,
      createdBy: userUid
    };

    return room;
  }

  navigateToMainPage() {
    setTimeout(() => {
      this.closeOverlay();
    }, 1200);
  }

  closeOverlay() {
    this.editRoomOverlayRef.close();
  }

  showSuccessMessage() {
    this.isRoomSaved = true;
  }

  hideNotification() {
    setTimeout(() => {
      this.isFormValid = true;
    }, 3000);
  }

  toggle() {
    this.showPassword = !this.showPassword;
  }

  get roomName() {
    return this.chatroomForm.get('roomName');
  }

  get accessibility() {
    return this.chatroomForm.get('accessibility');
  }

  get password() {
    return this.chatroomForm.get('password');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
