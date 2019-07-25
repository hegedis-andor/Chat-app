import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-users-bar',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  @Input() onlineUsers$;
  @Input() offlineUsers$;
  @Input() user: User;

  constructor() {}

  isOtherUser(uid: string) {
    return this.user.uid !== uid;
  }
}
