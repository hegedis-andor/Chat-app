import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.scss']
})
export class NewroomComponent implements OnInit {
  room: Room;
  chatroomForm: FormGroup;
  accessTypes = [ "public", "private", "protected" ];
  accessability: string;
  isFormInvalid: boolean;
  isRoomAdded: boolean;

  constructor( 
    private roomService: RoomService,
    private router: Router
    ) { 
    this.room = {};

    this.chatroomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      accessibility: new FormControl(this.accessTypes[0], [Validators.required]),
      password: new FormControl('',),
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

    this.roomService.add(this.room); //succes not checked yet.

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
