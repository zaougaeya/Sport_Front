import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecommendationDialogComponent } from './app-recommendation-dialog.component';

describe('AppRecommendationDialogComponent', () => {
  let component: AppRecommendationDialogComponent;
  let fixture: ComponentFixture<AppRecommendationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRecommendationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRecommendationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
