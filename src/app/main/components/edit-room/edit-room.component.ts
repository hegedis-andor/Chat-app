import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-newroom',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit, OnDestroy {

  chatroomForm: FormGroup;
  accessTypes = ["public", "private", "protected"];
  accessability: string;
  isFormValid: boolean = true;
  isRoomSaved: boolean;
  roomKey: string;
  subscription: Subscription;
  showPassword: boolean;
  action: string = 'create';
  roomForUpdate: Room;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.chatroomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      accessibility: new FormControl(this.accessTypes[0], [Validators.required]),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    this.roomKey = this.route.snapshot.queryParamMap.get('roomKey');

    if (this.roomKey) {
      this.action = 'update';

      this.subscription = this.roomService.getBy(this.roomKey).subscribe( r => {
        this.roomForUpdate = r;

        this.chatroomForm.controls['roomName'].setValue(this.roomForUpdate['name']);
        this.chatroomForm.controls['accessibility'].setValue(this.roomForUpdate['accessibility']);
        this.chatroomForm.controls['password'].setValue(this.roomForUpdate['password']);
      });
    }
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

  save() {
    if (this.chatroomForm.invalid) {
      this.isFormValid = false;
      this.hideNotification();
      return;
    }

    if(this.action === 'create')
      this.create();
    else 
      this.update();
  }

  initRoomFromForm(): Room {
    let room: Room = {};
    room.name = this.roomName.value;
    room.password = (this.password.value === "") ? null : this.password.value;
    room.accessibility = this.accessibility.value;

    return room;
  }

  create() {
    let room = this.initRoomFromForm();

    this.roomService.create(room); //Not checked if it succeed
    this.navigateToMainPage();
  }

  update() {
    let room = this.initRoomFromForm();
    room.key = this.roomForUpdate.key;

    this.roomService.update(room);  //Not checked if it succeed
    this.navigateToMainPage();
  }

  navigateToMainPage() {
    this.isRoomSaved = true;
    setTimeout(() => {
      this.router.navigateByUrl('/main');
    }, 1200)
  }

  hideNotification() {
    setTimeout(() => {
      this.isFormValid = true;
    }, 3000);
  }

  toggle() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
