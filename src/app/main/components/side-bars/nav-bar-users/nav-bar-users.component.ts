import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PresenceService } from 'src/app/shared/services/presence.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar-users',
  templateUrl: './nav-bar-users.component.html',
  styleUrls: ['./nav-bar-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarsSmartComponent implements OnInit, OnDestroy {
  onlineUsers$;
  offlineUsers$;
  user: User;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private presenceService: PresenceService
  ) {
    this.presenceService.setUserPresence();
    this.onlineUsers$ = this.userService.getOnlineUsers();
    this.offlineUsers$ = this.userService.getOfflineUsers();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
