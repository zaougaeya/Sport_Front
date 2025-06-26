import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftSingleCardComponent } from './nft-single-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NftSingleCardComponent', () => {
  let component: NftSingleCardComponent;
  let fixture: ComponentFixture<NftSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftSingleCardComponent, // ✅ standalone component
        BrowserAnimationsModule, // ✅ pour animations si présentes
        HttpClientTestingModule // ✅ si HttpClient est utilisé dans le composant ou services liés
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NftSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
