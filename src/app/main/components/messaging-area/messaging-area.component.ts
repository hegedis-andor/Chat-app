import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ChatroomMessage } from '../../models/chatroom-message.model';
import { Room } from '../../models/room.model';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-messaging-area',
  templateUrl: './messaging-area.component.html',
  styleUrls: ['./messaging-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagingAreaComponent {
  @Input() messages;
  @Input() user: User;
  @Input() room: Room;
  @Output() messageEmitter = new EventEmitter<ChatroomMessage>();
  messageToSend: string;

  constructor() {}

  canSendMessage(): boolean {
    const isEmpty = this.messageToSend === '' || !this.messageToSend;
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
      content: this.messageToSend,
      roomKey: this.room.key
    };

    this.messageEmitter.emit(chatroomMessage);

    this.messageToSend = '';
  }
}
