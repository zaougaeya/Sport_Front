import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftComponent } from './nft.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('NftComponent', () => {
  let component: NftComponent;
  let fixture: ComponentFixture<NftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftComponent,                // ✅ Composant standalone
        HttpClientTestingModule,     // ✅ Simule les appels HTTP
        ReactiveFormsModule,         // ✅ Si le composant utilise des formulaires réactifs
        FormsModule,                 // ✅ Si des formulaires standards sont utilisés
        BrowserAnimationsModule      // ✅ Nécessaire pour animations Angular Material
      ],
      providers: [
        SvgIconRegistryService       // ✅ Nécessaire pour les icônes SVG si utilisé dans le template
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
