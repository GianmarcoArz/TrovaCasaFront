import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatoImmobile, TipoUser } from '../../interfaces/i-immobili';
import { ImmobiliService } from '../../services/immobili.service';

@Component({
  standalone: false,
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  immobileForm: FormGroup;
  tipiUser = Object.values(TipoUser);
  statiImmobile = Object.values(StatoImmobile);
  showForm = false;

  constructor(private fb: FormBuilder, private immobiliService: ImmobiliService) {
    this.immobileForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: [null, Validators.required],
      metriQuadri: [null, Validators.required],
      numeroVani: [null, Validators.required],
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
      tipoUser: ['', Validators.required],
      statoImmobile: ['', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.immobileForm.valid) {
      const immobile = {
        ...this.immobileForm.value,
        dataDiInserimento: new Date()
      };

      this.immobiliService.creaImmobile(immobile).subscribe({
        next: (response) => {
          console.log('Immobile creato con successo', response);
          this.immobileForm.reset();
          this.showForm = false;
        },
        error: (error) => console.error('Errore nella creazione dell\'immobile', error)
      });
    }
  }
}
