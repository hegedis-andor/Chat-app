import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from '../../services/chat-room.service';
import { ChatroomMessage } from '../../models/chatroom-message.model';
import { Room } from '../../models/room.model';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-messaging-area',
  templateUrl: './messaging-area.component.html',
  styleUrls: ['./messaging-area.component.scss']
})
export class MessagingAreaComponent implements OnInit, OnDestroy {

  messages$;
  inputMessage: string;
  room: Room;
  user: User;
  userSubscription: Subscription;

  constructor(
    public chatService: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user);
  }

  open(room) {
    this.room = room;
    this.messages$ = this.chatService.getBy(this.room.key);
  }

  canSendMessage(): boolean {
    const isEmpty = (this.inputMessage === '' || this.inputMessage === undefined);
    const isRoomSelected = this.room ? true : false;

    return (!isEmpty && isRoomSelected);
  }

  sendMessage() {
    if (!this.canSendMessage()) {
      return;
    }

    const chatroomMessage: ChatroomMessage = {
      timestamp: + new Date(),
      userId: this.authService.user.uid,
      username: this.authService.user.displayName,
      content: this.inputMessage,
      roomKey: this.room.key
    };

    this.chatService.create(chatroomMessage); // not checked if it succeeded
    this.inputMessage = '';
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
