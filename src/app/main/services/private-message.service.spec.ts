import { TestBed } from '@angular/core/testing';

import { PrivateMessageService } from './private-message.service';

describe('PrivateMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateMessageService = TestBed.get(PrivateMessageService);
    expect(service).toBeTruthy();
  });
});
