import { TestBed } from '@angular/core/testing';

import { ChatPartnerService } from './chat-partner.service';

describe('ChatPartnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatPartnerService = TestBed.get(ChatPartnerService);
    expect(service).toBeTruthy();
  });
});
