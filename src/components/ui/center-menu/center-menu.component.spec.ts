import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterMenuComponent } from './center-menu.component';

describe('CenterMenuComponent', () => {
  let component: CenterMenuComponent;
  let fixture: ComponentFixture<CenterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
