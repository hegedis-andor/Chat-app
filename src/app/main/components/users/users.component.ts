import { Subscription } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { PresenceService } from './../../../shared/services/presence.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-bar',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  onlineUsers$;
  offlineUsers$;
  user: User;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private presenceService: PresenceService) {

    this.presenceService.setUserPresence();
    this.onlineUsers$ = this.userService.getOnlineUsers();
    this.offlineUsers$ = this.userService.getOfflineUsers();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user);
  }

  isOtherUser(uid: string) {
    return this.user.uid !== uid;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
