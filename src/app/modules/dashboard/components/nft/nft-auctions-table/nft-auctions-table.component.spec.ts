import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftAuctionsTableComponent } from './nft-auctions-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';

describe('NftAuctionsTableComponent', () => {
  let component: NftAuctionsTableComponent;
  let fixture: ComponentFixture<NftAuctionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftAuctionsTableComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot()  // <-- important pour fournir SvgLoader et SvgIconRegistryService
      ],
      // plus besoin de fournir SvgIconRegistryService manuellement ici
    }).compileComponents();

    fixture = TestBed.createComponent(NftAuctionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
