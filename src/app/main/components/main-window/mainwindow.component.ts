import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ChatroomMessage } from '../../models/chatroom-message.model';
import { Room } from '../../models/room.model';
import { ChatService } from '../../services/chat-room.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainwindowComponent implements OnInit, OnDestroy {
  messages$;
  room: Room;
  user: User;
  userSubscription: Subscription;
  paramSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));

    this.route.paramMap.subscribe((params: Params) => {
      const roomKey = params.get('roomKey');

      if (!roomKey) {
        return;
      }

      this.messages$ = this.chatService.getBy(roomKey);
      this.roomService.getBy(roomKey).subscribe(room => (this.room = room));
      this.cd.markForCheck();
    });
  }

  onSendMessage(chatroomMessage: ChatroomMessage) {
    this.chatService.create(chatroomMessage); // not checked if it succeeded
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
