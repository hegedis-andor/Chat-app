import { User } from 'src/app/shared/models/user.model';
import { ChatPartner } from './../../models/chat-partner.model';
import { ChatPartnerService } from './../../services/chat-partner.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

import { PresenceService } from '../../../shared/services/presence.service';
import { PrivateMessage } from '../../models/private-message.model';
import { PrivateMessageService } from '../../services/private-message.service';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss']
})
export class PrivateMessageComponent implements OnInit, OnDestroy {
  messages$;
  serverErrorMessage;
  inputMessage: string;
  partner: ChatPartner;
  user: User;
  paramSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    public privateMessageService: PrivateMessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private presenceService: PresenceService,
    private partnerService: ChatPartnerService
  ) {
    this.presenceService.setUserPresence();
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.partner = {
        uid: params.get('partnerUid'),
        name: params.get('partnerName')
      };

      if (this.partner.name === 'All') {
        this.messages$ = of(null);
        return;
      }

      this.userSubscription = this.authService.user$.subscribe(user => {
        this.user = user;

        this.partnerService.addPartner(this.user.uid, this.partner);
        this.messages$ = this.privateMessageService.getAllBy(
          this.user.uid,
          this.partner.uid
        );
      });
    });
  }

  canSend() {
    const isEmpty = this.inputMessage === '' || this.inputMessage === undefined;
    const isPartnerSelected = this.partner.uid !== '0' ? true : false;

    return !isEmpty && isPartnerSelected;
  }

  sendMessage() {
    if (!this.canSend()) {
      return;
    }

    const privateMessage: PrivateMessage = {
      timestamp: +new Date(),
      senderUid: this.user.uid,
      senderName: this.user.displayName,
      partnerUid: this.partner.uid,
      partnerName: this.partner.name,
      content: this.inputMessage
    };

    this.privateMessageService.create(privateMessage); // not checked if it succeeded
    this.inputMessage = '';
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
