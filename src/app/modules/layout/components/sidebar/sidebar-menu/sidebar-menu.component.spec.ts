import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';  // ✅ AJOUT

describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarMenuComponent, 
        AngularSvgIconModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule     // ✅ Pour fournir ActivatedRoute, Router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
