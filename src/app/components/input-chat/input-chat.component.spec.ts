import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChatComponent } from './input-chat.component';

describe('InputChatComponent', () => {
  let component: InputChatComponent;
  let fixture: ComponentFixture<InputChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
