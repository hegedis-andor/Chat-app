import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newroom',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {
  room: Room;
  chatroomForm: FormGroup;
  accessTypes = [ "public", "private", "protected" ];
  accessability: string;
  isFormInvalid: boolean;
  isRoomAdded: boolean;
  roomKey: string;

  constructor( 
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.room = {};
    this.roomKey = this.route.snapshot.queryParamMap.get('roomKey');
    
    if (this.roomKey)
      this.roomService.getRoomByKey(this.roomKey);

    this.chatroomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      accessibility: new FormControl(this.accessTypes[0], [Validators.required]),
      password: new FormControl(''),
    });
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

  add() {
   if (this.chatroomForm.invalid) {
      this.isFormInvalid = true;
      this.hideNotification();
      return;
    }

    this.room.name = this.roomName.value;
    this.room.password = (this.password.value === "") ? null : this.password.value; //It is null, when password is not required (public, protected)
    this.room.accessablitiy =  this.accessibility.value;

    this.roomService.add(this.room); //succes's not checked yet.

    this.isRoomAdded = true;
    setTimeout(() => {
      this.router.navigateByUrl('/main');
    }, 1200)

  }

  hideNotification() {
    setTimeout(() => {
      this.isFormInvalid = false;
    }, 3000);
  }

  ngOnInit() {
  }


}
