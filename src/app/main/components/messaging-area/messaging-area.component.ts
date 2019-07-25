import { Component } from '@angular/core';
import { ChatroomMessage } from '../../models/chatroom-message.model';
import { Room } from '../../models/room.model';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-messaging-area',
  templateUrl: './messaging-area.component.html',
  styleUrls: ['./messaging-area.component.scss']
})
export class MessagingAreaComponent {
  messages$;
  inputMessage: string;
  room: Room;
  user: User;

  constructor() {}

  open(room: Room) {
    this.room = room;
  }

  canSendMessage(): boolean {
    const isEmpty = this.inputMessage === '' || this.inputMessage === undefined;
    const isRoomSelected = this.room ? true : false;

    return !isEmpty && isRoomSelected;
  }

  sendMessage() {
    if (!this.canSendMessage()) {
      return;
    }

    const chatroomMessage: ChatroomMessage = {
      timestamp: +new Date(),
      userId: this.user.uid,
      username: this.user.displayName,
      content: this.inputMessage,
      roomKey: this.room.key
    };

    this.chatService.create(chatroomMessage); // not checked if it succeeded
    this.inputMessage = '';
  }
}
