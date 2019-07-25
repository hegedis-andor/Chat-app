import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

import { Room } from '../../models/room.model';
import { ChatService } from '../../services/chat-room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.scss']
})
export class MainwindowComponent implements OnInit, OnDestroy {
  messages$;
  inputMessage: string;
  room: Room;
  user: User;
  userSubscription: Subscription;
  paramSubscription: Subscription;

  constructor(
    public chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => (this.user = user));
    this.paramSubscription = this.route.paramMap.subscribe(params => {
    }
    this.messages$ = this.chatService.getBy(this.room.key);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
