import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatroomMessage } from '../../models/chatroom-message.model';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from '../../models/room.model';



@Component({
  selector: 'messaging-area',
  templateUrl: './messaging-area.component.html',
  styleUrls: ['./messaging-area.component.scss']
})
export class MessagingAreaComponent {
  
  messages$;
  inputMessage: string;
  room: Room;

  constructor(
    public chatService: ChatService,
    private authService: AuthService
  ){}

  open(room) {
    this.room = room;
    this.messages$ = this.chatService.getBy(this.room.key);
  }

  canSend() {
    let isEmpty = (this.inputMessage == '' || this.inputMessage == undefined);
    let isRoomSelected = this.room ? true: false;

    return (!isEmpty && isRoomSelected);
  }

  sendMessage() {
    if(!this.canSend())
      return;

    let chatroomMessage: ChatroomMessage = {
      timestamp: + new Date(),
      userId: this.authService.user.uid,
      username: this.authService.user.displayName,
      content: this.inputMessage,
      roomKey: this.room.key
    };

    this.chatService.create(chatroomMessage);
    this.inputMessage = '';
  }

}
