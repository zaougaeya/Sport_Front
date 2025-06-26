import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon'; // Importation de AngularSvgIconModule

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot() // Fournit SvgIconRegistryService et SvgLoader
      ],
      // SvgIconRegistryService est fourni par AngularSvgIconModule.forRoot(), donc pas besoin de le lister ici explicitement
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
