import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NftDualCardComponent } from './nft-dual-card.component';

describe('NftDualCardComponent', () => {
  let component: NftDualCardComponent;
  let fixture: ComponentFixture<NftDualCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NftDualCardComponent] // ✅ composant standalone => on l'importe
    }).compileComponents();

    fixture = TestBed.createComponent(NftDualCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
