import { PresenceService } from './../../../shared/services/presence.service';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-bar',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  onlineUsers$;
  offlineUsers$;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private presenceService: PresenceService) {

    this.presenceService.setUserPresence();
    this.onlineUsers$ = this.userService.getOnlineUsers();
    this.offlineUsers$ = this.userService.getOfflineUsers();
  }

  isOtherUser(uid: string) {
    return this.authService.user.uid !== uid;
  }

}
