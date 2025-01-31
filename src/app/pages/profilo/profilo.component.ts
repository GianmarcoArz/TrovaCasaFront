import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImmobiliService } from '../../services/immobili.service';
import { ImmobileDTO } from '../../interfaces/immobile-dto';

@Component({
  standalone: false,
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent implements OnInit {
  showForm: boolean = false;
  immobileForm!: FormGroup;
  immobiliUser: ImmobileDTO[] = [];

  constructor(private fb: FormBuilder, private immobiliService: ImmobiliService) {}

  ngOnInit(): void {
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
    this.immobiliService.getImmobiliUser().subscribe((data: ImmobileDTO[]) => {
      this.immobiliUser = data;
    });
  }
  toggleDetails(immobile: ImmobileDTO): void {
    immobile.expanded = !immobile.expanded;
  }
}
