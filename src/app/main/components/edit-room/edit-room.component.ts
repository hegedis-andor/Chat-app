import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit, OnDestroy {
  accessTypes = ['public', 'private', 'protected'];

  chatroomForm: FormGroup;
  accessability: string;
  isFormValid = true;
  isRoomSaved: boolean;
  roomForUpdate: Room;
  roomKey: string;
  showPassword: boolean;
  subscription: Subscription;
  user: User;
  userSubscription: Subscription;
  action = 'create';

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.chatroomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      accessibility: new FormControl(this.accessTypes[0], [Validators.required]),
      password: new FormControl('')
    });
  }

  ngOnInit() {
    this.roomKey = this.route.snapshot.queryParamMap.get('roomKey');
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));

    if (this.roomKey) {
      this.action = 'update';

      this.subscription = this.roomService.getRoomBy(this.roomKey).subscribe((r: Room) => {
        this.roomForUpdate = r;

        this.chatroomForm.controls.roomName.setValue(this.roomForUpdate.name);
        this.chatroomForm.controls.accessibility.setValue(this.roomForUpdate.accessibility);
        this.chatroomForm.controls.password.setValue(this.roomForUpdate.password);
      });
    }
  }

  save() {
    if (this.chatroomForm.invalid) {
      this.isFormValid = false;
      this.hideNotification();
      return;
    }

    if (this.action === 'create') {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    const room = this.initRoomFromForm();

    this.roomService.create(room); // Not checked if it succeeded
    this.navigateToMainPage();
  }

  update() {
    const room = this.initRoomFromForm();
    room.key = this.roomForUpdate.key;

    this.roomService.update(room); // Not checked if it succeeded
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
    this.showSuccessMessage();

    setTimeout(() => {
      this.router.navigateByUrl('/main');
    }, 1200);
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
