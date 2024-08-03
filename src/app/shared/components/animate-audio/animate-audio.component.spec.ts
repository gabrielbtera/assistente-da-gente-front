import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateAudioComponent } from './animate-audio.component';

describe('AnimateAudioComponent', () => {
  let component: AnimateAudioComponent;
  let fixture: ComponentFixture<AnimateAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimateAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
