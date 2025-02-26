import { Component, OnInit } from '@angular/core';
import { ImmobileDTO } from '../../interfaces/immobile-dto';
import { ImmobiliService } from '../../services/immobili.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-select-immobile',
  templateUrl: './select-immobile.component.html',
  styleUrls: ['./select-immobile.component.scss']
})
export class SelectImmobileComponent implements OnInit {
  immobile: ImmobileDTO | null = null;

  constructor(private route: ActivatedRoute, private immobiliService: ImmobiliService) {}

  ngOnInit(): void {
    const immobileId = this.route.snapshot.paramMap.get('immobileId');
    if (immobileId) {
      this.immobiliService.getImmobileById(+immobileId).subscribe(data => {
        this.immobile = data;
      }, error => {
        console.error('Errore nel recupero dell\'immobile', error);
      });
    }
  }

  prenotaDisponibilita(appuntamentoId: number): void {
    this.immobiliService.prenotaDisponibilita(appuntamentoId).subscribe(() => {
      alert('Prenotazione effettuata con successo');
    }, error => {
      console.error('Errore nella prenotazione della disponibilità', error);
    });
  }

}
