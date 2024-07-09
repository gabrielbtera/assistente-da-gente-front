import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecButtonComponent } from './selec-button.component';

describe('SelecButtonComponent', () => {
  let component: SelecButtonComponent;
  let fixture: ComponentFixture<SelecButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
