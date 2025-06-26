import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftAuctionsTableComponent } from './nft-auctions-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('NftAuctionsTableComponent', () => {
  let component: NftAuctionsTableComponent;
  let fixture: ComponentFixture<NftAuctionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftAuctionsTableComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        SvgIconRegistryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NftAuctionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
