import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPartnersComponent } from './chat-partners.component';

describe('ChatPartnersComponent', () => {
  let component: ChatPartnersComponent;
  let fixture: ComponentFixture<ChatPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
