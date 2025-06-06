import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPageComponent } from './application-page.component';

describe('ApplicationPageComponent', () => {
  let component: ApplicationPageComponent;
  let fixture: ComponentFixture<ApplicationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
