import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptedTextComponent } from './encrypted-text.component';

describe('EncryptedTextComponent', () => {
  let component: EncryptedTextComponent;
  let fixture: ComponentFixture<EncryptedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptedTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
