import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatoImmobile} from '../../interfaces/i-immobili';
import { ImmobiliService } from '../../services/immobili.service';
import { ImmobileDTO } from '../../interfaces/immobile-dto';

@Component({
  standalone: false,
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  immobileForm: FormGroup;
  statoImmobileOptions = Object.values(StatoImmobile);

  constructor(
    private fb: FormBuilder,
    private immobiliService: ImmobiliService
  ) {
    this.immobileForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: [null, [Validators.required, Validators.min(0)]],
      metriQuadri: [null, [Validators.required, Validators.min(0)]],
      numeroVani: [null, [Validators.required, Validators.min(0)]],
      piano: [null, Validators.required],
      via: ['', Validators.required],
      civico: [null, Validators.required],
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
      statoImmobile: ['', Validators.required]

    });
  }

  onSubmit() {
    if (this.immobileForm.valid) {
      const immobileDTO: ImmobileDTO = this.immobileForm.value;
      this.immobiliService.creaAnnuncio(immobileDTO).subscribe({
        next: (response) => {
          alert('Annuncio creato con successo!');
          this.immobileForm.reset();
        },
        error: (error) => {
          console.error('Errore durante la creazione dell\'annuncio:', error);
          alert('Si è verificato un errore. Controlla la console per i dettagli.');
        }
      });
    }
  }
}

