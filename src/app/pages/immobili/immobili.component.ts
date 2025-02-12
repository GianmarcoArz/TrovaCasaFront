import { Component, OnInit } from '@angular/core';
import { ImmobiliService } from '../../services/immobili.service';
import { iImmobili } from '../../interfaces/i-immobili';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-immobili',
  templateUrl: './immobili.component.html',
  styleUrls: ['./immobili.component.scss']
})
export class ImmobiliComponent implements OnInit {
  immobili: iImmobili[] = [];
  filteredImmobili: iImmobili[] = [];
  showAdvancedFilters: boolean = false;
  searchCriteria: any = {
    titolo: '',
    descrizione: '',
    prezzoMin: null,
    prezzoMax: null,
    metriQuadri: null,
    numeroVani: null,
    comune: '',
    via: '',
    postoAuto: '',
    statoImmobile: ''
  };

  constructor(private immobiliService: ImmobiliService, private router: Router) {}

  ngOnInit(): void {
    this.loadImmobili();
  }

  loadImmobili(): void {
    this.immobiliService.getAllImmobili().subscribe(data => {
      this.immobili = data;
      this.filteredImmobili = data;
    }, error => {
      console.error('Errore nel recupero degli immobili', error);
    });
  }

  filterImmobili(): void {
    this.filteredImmobili = this.immobili.filter(immobile => {
      return (
        (!this.searchCriteria.titolo || immobile.titolo.toLowerCase().includes(this.searchCriteria.titolo.toLowerCase())) &&
        (!this.searchCriteria.descrizione || immobile.descrizione.toLowerCase().includes(this.searchCriteria.descrizione.toLowerCase())) &&
        (!this.searchCriteria.prezzoMin || immobile.prezzo >= this.searchCriteria.prezzoMin) &&
        (!this.searchCriteria.prezzoMax || immobile.prezzo <= this.searchCriteria.prezzoMax) &&
        (!this.searchCriteria.metriQuadri || immobile.metriQuadri >= this.searchCriteria.metriQuadri) &&
        (!this.searchCriteria.numeroVani || immobile.numeroVani >= this.searchCriteria.numeroVani) &&
        (!this.searchCriteria.comune || immobile.comune.toLowerCase().includes(this.searchCriteria.comune.toLowerCase())) &&
        (!this.searchCriteria.via || immobile.via.toLowerCase().includes(this.searchCriteria.via.toLowerCase())) &&
        (this.searchCriteria.postoAuto === '' || immobile.postoAuto === (this.searchCriteria.postoAuto === 'true')) &&
        (!this.searchCriteria.statoImmobile || immobile.statoImmobile === this.searchCriteria.statoImmobile)
      );
    });
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  viewImmobileDetails(immobileId: number): void {
    this.router.navigate(['/immobili', immobileId]);
  }
}
