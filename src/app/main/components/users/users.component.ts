import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  onlineUsers$;
  offlineUsers$;

  constructor(public userService: UserService) { 
    this.onlineUsers$ = this.userService.getOnlineUsers();
    this.offlineUsers$ = this.userService.getOfflineUsers();
  }

  isOtherUser(uid: string) {
    return this.userService.getUserUid() != uid;
  }

}
