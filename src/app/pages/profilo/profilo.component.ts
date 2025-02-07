import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImmobiliService } from '../../services/immobili.service';
import { ImmobileDTO } from '../../interfaces/immobile-dto';
import { ImmagineImmobile } from '../../interfaces/i-immobili';
import { AppuntamentoDTO } from '../../interfaces/appuntamento-dto';

@Component({
  standalone: false,
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {
  showForm: boolean = false;
  immobileForm!: FormGroup;
  immobiliUser: ImmobileDTO[] = [];
  imagePreviewsMap: { [key: number]: string[] } = {};
  selectedFilesMap: { [key: number]: File[] } = {};
  selectedImmobileId: number | null = null;
  showDisponibilitaForm: boolean = false;
  disponibilitaForm!: FormGroup;
  showAggiornaDisponibilitaForm: boolean = false;
  aggiornaDisponibilitaForm!: FormGroup;
  selectedDisponibilitaId: number | null = null;

  constructor(private fb: FormBuilder, private immobiliService: ImmobiliService) {}

  ngOnInit(): void {

    this.disponibilitaForm = this.fb.group({
      dataDisponibilita: ['', Validators.required],
      oraInizio: ['', Validators.required],
      oraFine: ['', Validators.required]
    });

    this.aggiornaDisponibilitaForm = this.fb.group({
      dataDisponibilita: ['', Validators.required],
      oraInizio: ['', Validators.required],
      oraFine: ['', Validators.required]
    });

    this.immobileForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: [0, Validators.required],
      metriQuadri: [0, Validators.required],
      numeroVani: [0, Validators.required],
      piano: [0, Validators.required],
      via: ['', Validators.required],
      civico: [0, Validators.required],
      comune: ['', Validators.required],
      provincia: ['', Validators.required],
      postoAuto: [false],
      giardino: [false],
      terrazzo: [false],
      ascensore: [false],
      cantina: [false],
      riscaldamento: [false],
      climatizzazione: [false],
      allarme: [false],
      sorveglianza: [false],
      statoImmobile: ['', Validators.required],
    });

    this.loadImmobiliUser();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  toggleDisponibilitaForm(immobileId: number): void {
    this.selectedImmobileId = immobileId;
    this.showDisponibilitaForm = !this.showDisponibilitaForm;
  }

  toggleAggiornaDisponibilitaForm(disponibilita: any): void {
    this.selectedDisponibilitaId = disponibilita.id;
    this.aggiornaDisponibilitaForm.patchValue(disponibilita);
    this.showAggiornaDisponibilitaForm = !this.showAggiornaDisponibilitaForm;
  }

  creaDisponibilita(immobileId: number): void {
    if (this.disponibilitaForm.valid) {
      const disponibilitaData: AppuntamentoDTO = this.disponibilitaForm.value;
      this.immobiliService.creaDisponibilita(immobileId, disponibilitaData).subscribe(response => {
        alert('Disponibilità creata con successo');
        this.showDisponibilitaForm = false;
        this.disponibilitaForm.reset();
      }, error => {
        alert('Errore nella creazione della disponibilità');
      });
    }
  }
  aggiornaDisponibilita(): void {
    if (this.aggiornaDisponibilitaForm.valid && this.selectedDisponibilitaId !== null) {
      const disponibilitaData: AppuntamentoDTO = this.aggiornaDisponibilitaForm.value;
      this.immobiliService.aggiornaDisponibilita(this.selectedDisponibilitaId, disponibilitaData).subscribe(response => {
        alert('Disponibilità aggiornata con successo');
        this.showAggiornaDisponibilitaForm = false;
        this.aggiornaDisponibilitaForm.reset();
        this.selectedDisponibilitaId = null;
        this.loadImmobiliUser(); // Reload the user's properties
      }, error => {
        alert('Errore nell\'aggiornamento della disponibilità');
      });
    }
  }

  eliminaDisponibilita(disponibilitaId: number): void {
    if (confirm('Sei sicuro di voler eliminare questa disponibilità?')) {
      this.immobiliService.eliminaDisponibilita(disponibilitaId).subscribe(response => {
        alert('Disponibilità eliminata con successo');
        this.loadImmobiliUser(); // Reload the user's properties
      }, error => {
        alert('Errore nell\'eliminazione della disponibilità');
      });
    }
  }

  creaAnnuncio(): void {
    if (this.immobileForm.valid) {
      const immobileData: ImmobileDTO = this.immobileForm.value;
      this.immobiliService.creaAnnuncio(immobileData).subscribe(response => {
        alert('Annuncio creato con successo');
        this.showForm = false;
        this.immobileForm.reset();
        this.loadImmobiliUser(); // Reload the user's properties

      }, error => {
        alert('Errore nella creazione dell\'annuncio');
      });
    }
  }

  loadImmobiliUser(): void {
    this.immobiliService.getImmobiliUser().subscribe(
      (data: ImmobileDTO[]) => {
        this.immobiliUser = data;
        this.immobiliUser.forEach(immobile => {
          this.loadImmaginiForImmobile(immobile.id);
        });
      },
      (error) => {
        console.error('Error loading user properties:', error);
        alert('Errore nel caricamento degli immobili');
      }
    );
  }

  loadImmaginiForImmobile(immobileId: number): void {
    this.immobiliService.getImmaginiByImmobileId(immobileId).subscribe(
      (immagini: ImmagineImmobile[]) => {
        this.imagePreviewsMap[immobileId] = immagini.map(img => img.urlImmagine);
        const immobile = this.immobiliUser.find(i => i.id === immobileId);
        if (immobile) {
          immobile.immagini = immagini;
        }
      },
      (error) => {
        console.error('Error loading images for immobile:', error);
      }
    );
  }

  toggleDetails(immobile: ImmobileDTO): void {
    immobile.expanded = !immobile.expanded;
  }

  onFileSelected(event: any, immobileId: number): void {
    const selectedFiles = Array.from(event.target.files) as File[];
    this.selectedFilesMap[immobileId] = selectedFiles;
    this.imagePreviewsMap[immobileId] = [];

    for (let file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewsMap[immobileId].push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImmagine(immobileId: number): void {
    const selectedFiles = this.selectedFilesMap[immobileId];
    if (selectedFiles && selectedFiles.length > 0) {
      this.immobiliService.uploadImmagine(immobileId, selectedFiles, true).subscribe(response => {
        alert('Immagini caricate con successo');
        this.selectedFilesMap[immobileId] = [];
        this.imagePreviewsMap[immobileId] = [];
        this.loadImmobiliUser(); // Reload the user's properties
      }, error => {
        alert('Errore nel caricamento delle immagini');
      });
    } else {
      alert('Seleziona almeno un file prima di caricare');
    }
  }

  hasImagePreviews(immobileId: number): boolean {
    return this.imagePreviewsMap[immobileId] && this.imagePreviewsMap[immobileId].length > 0;
  }

  editImmobile(immobile: ImmobileDTO): void {
    this.selectedImmobileId = immobile.id;
    this.immobileForm.patchValue(immobile);
    this.showForm = true;
  }

  aggiornaImmobile(): void {
    if (this.immobileForm.valid && this.selectedImmobileId !== null) {
      const immobileData: ImmobileDTO = this.immobileForm.value;
      this.immobiliService.aggiornaImmobile(this.selectedImmobileId, immobileData).subscribe(response => {
        alert('Immobile aggiornato con successo');
        this.showForm = false;
        this.immobileForm.reset();
        this.selectedImmobileId = null;
        this.loadImmobiliUser(); // Reload the user's properties
      }, error => {
        alert('Errore nell\'aggiornamento dell\'immobile');
      });
    }
  }

  deleteImmobile(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo immobile?')) {
      this.immobiliService.deleteImmobile(id).subscribe(response => {
        alert('Immobile eliminato con successo');
        this.loadImmobiliUser(); // Reload the user's properties
      }, error => {
        alert('Errore nell\'eliminazione dell\'immobile');
      });
    }
  }
}
