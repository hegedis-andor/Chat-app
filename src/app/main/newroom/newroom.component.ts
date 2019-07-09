import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.scss']
})
export class NewroomComponent implements OnInit {
  chatroomForm: FormGroup;
  accessTypes = [ "public", "private", "protected" ];
  accessability: string;
  isFormInvalid: boolean;


  constructor( private roomService: RoomService) { 
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

  addNewRoom() {
   if (this.chatroomForm.invalid) {
      this.isFormInvalid = true;
      this.hideNotification();
      return;
    }
    let name = this.roomName.value;
    let access = this.accessibility.value;
    let password = this.password.value;

    if (access == 'private') {
      this.roomService.add(name, access, password);
    } else {
      this.roomService.add(name, access, null);
    }

  }

  hideNotification() {
    setTimeout(() => {
      this.isFormInvalid = false;
    }, 3000);
  }

  ngOnInit() {
  }

}
