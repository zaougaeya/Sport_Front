import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftComponent } from './nft.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- À ajouter

describe('NftComponent', () => {
  let component: NftComponent;
  let fixture: ComponentFixture<NftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftComponent,                   // Composant standalone
        AngularSvgIconModule.forRoot(), // Pour SvgIconRegistryService
        HttpClientTestingModule          // <--- Fournit HttpClient mock pour test
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
