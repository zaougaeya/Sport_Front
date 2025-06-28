import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduitsComponent } from './produits.component';
import { Produit, ProduitService } from './produit.service';
import { CategoryService } from '../categories/category.service'; // Assurez-vous que le chemin est correct
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // ✅ Importation du module de pagination

describe('ProduitsComponent', () => {
  let component: ProduitsComponent;
  let fixture: ComponentFixture<ProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProduitsComponent, // ✅ Si ProduitsComponent est un composant standalone, il doit être importé ici.
                           // Si ce n'est pas un standalone, vous devriez importer le NgModule auquel il appartient
                           // et le supprimer de 'declarations'.
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule // ✅ Ajouté pour fournir le pipe 'paginate'
      ],
      // Si ProduitsComponent est standalone, 'declarations' n'est pas nécessaire et causerait une erreur.
      // Si ce n'est PAS un standalone et qu'il est déclaré dans un module parent, alors ce module parent
      // devrait être importé, ou ProduitsComponent devrait être déclaré ici SI le testbed sert de module simple.
      // D'après le contexte des erreurs précédentes, il est plus probable qu'il soit standalone.
      // Si vous avez un `@NgModule` pour `ProduitsComponent`, alors supprimez cette ligne de 'declarations'
      // et importez le module contenant `ProduitsComponent`.
      // declarations: [ProduitsComponent], // ⚠️ Supprimer si ProduitsComponent est standalone.

      providers: [
        ProduitService,
        CategoryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Détecte les changements et initialise le composant
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form when modifier is called', () => {
    // Assurez-vous que 'produitForm' est initialisé dans le composant au moment de la création
    // (par exemple, dans le constructeur ou ngOnInit). Sinon, ce test échouera.
    // Si votre composant ne l'initialise pas directement, vous pourriez le simuler ici:
    // component.produitForm = new FormGroup({ /* ... vos contrôles ... */ });

    const produit: Produit = {
      id: '1',
      nom: 'Produit Test',
      description: 'Description Test',
      prix: 50,
      quantiteEnStock: 10,
      imageUrl: 'http://test.png',
      disponible: true,
      pourcentagePromotion: 5,
      genreProduit: 'HOMME',
      statutProduit: 'EN_STOCK',
      categorie: {
        id: '1',
        nom: 'Catégorie',
        description: ''
      },
      dateAjout: new Date()
    };

    component.modifier(produit); // Appelle la méthode 'modifier' du composant
    expect(component.produitForm.value.nom).toBe('Produit Test');
    expect(component.isEditing).toBeTrue();
  });
});
