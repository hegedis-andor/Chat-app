import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatPartnerService } from './../../services/chat-partner.service';

@Component({
  selector: 'app-chat-partners',
  templateUrl: './chat-partners.component.html',
  styleUrls: ['./chat-partners.component.scss']
})
export class ChatPartnersComponent implements OnInit, OnDestroy {

  partners$;
  userSubscription: Subscription;

  constructor(
    private partnerService: ChatPartnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.partners$ = this.partnerService.getPartners(user.uid);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
