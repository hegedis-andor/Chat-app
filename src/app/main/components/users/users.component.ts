import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$;

  constructor(public userService: UserService) { 
    this.users$ = this.userService.getUsers();
  }

  isOtherUser(uid: string) {
    return this.userService.getUserUid() != uid;
  }

}
