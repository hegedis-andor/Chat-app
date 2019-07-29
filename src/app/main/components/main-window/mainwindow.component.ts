import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ChatroomMessage } from '../../models/chatroom-message.model';
import { Room } from '../../models/room.model';
import { ChatService } from '../../services/chat-room.service';
import { RoomService } from '../../services/room.service';
import { map, switchMap } from 'rxjs/operators';

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

    this.paramSubscription = this.route.paramMap
      .pipe(
        map(params => params.get('roomKey')),
        switchMap((roomKey: string) => {
          if (!roomKey) {
            return;
          }

          this.messages$ = this.chatService.getMessagesBy(roomKey);
          return this.roomService.getRoomBy(roomKey);
        })
      )
      .subscribe(room => {
        this.room = room;
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

    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
