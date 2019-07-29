import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-partners',
  templateUrl: './chat-partners.component.html',
  styleUrls: ['./chat-partners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPartnersComponent {
  @Input() partners;

  constructor() {}
}
