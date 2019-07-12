import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PrivateMessage } from '../../models/private-message.model';
import { AuthService } from './../../../services/auth.service';
import { PrivateMessageService } from './../../services/private-message.service';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss']
})
export class PrivateMessageComponent implements OnInit, OnDestroy {

  messages$;
  inputMessage: string;
  partnerUid: string;
  partnerName: string;
  paramSubscription: Subscription;

  constructor(
    public privateMessageService: PrivateMessageService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.partnerUid = params.get('partnerUid');
      this.partnerName = params.get('partnerName');
      this.messages$ = this.privateMessageService.getAllBy(this.authService.user.uid, this.partnerUid);
    });
  }

  canSend() {
    const isEmpty = (this.inputMessage === '' || this.inputMessage === undefined);
    const isPartnerSelected = this.partnerUid ? true : false;

    return (!isEmpty && isPartnerSelected);
  }

  sendMessage() {
    if (!this.canSend()) {
      return;
    }

    const privateMessage: PrivateMessage = {
      timestamp: + new Date(),
      senderUid: this.authService.user.uid,
      partnerUid: this.partnerUid,
      partnerName: this.partnerName,
      content: this.inputMessage,
    };

    this.privateMessageService.create(privateMessage); // not checked if it succeeds
    this.inputMessage = '';
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
