import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';



@Component({
  selector: 'chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

  message: string;

  constructor(private chatService: ChatService){
  }

  ngOnInit() {
  }

  isEmpty() {
    return (this.message == '' || this.message == undefined);
  }

  sendMessage() {
    this.chatService.send(this.message);
  }

}
