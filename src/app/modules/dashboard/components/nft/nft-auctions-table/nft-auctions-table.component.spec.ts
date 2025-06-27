import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftAuctionsTableComponent } from './nft-auctions-table.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NftAuctionsTableComponent', () => {
  let component: NftAuctionsTableComponent;
  let fixture: ComponentFixture<NftAuctionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NftAuctionsTableComponent,
        AngularSvgIconModule.forRoot(),
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NftAuctionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
