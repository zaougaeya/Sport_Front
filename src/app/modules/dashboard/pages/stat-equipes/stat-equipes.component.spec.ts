import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatEquipesComponent } from './stat-equipes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // importer le module de test HTTP

describe('StatEquipesComponent', () => {
  let component: StatEquipesComponent;
  let fixture: ComponentFixture<StatEquipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatEquipesComponent, HttpClientTestingModule], // ajouter HttpClientTestingModule ici
    }).compileComponents();

    fixture = TestBed.createComponent(StatEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
