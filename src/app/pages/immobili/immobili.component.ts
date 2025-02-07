import { Component, OnInit } from '@angular/core';
import { ImmobiliService } from '../../services/immobili.service';
import { iImmobili } from '../../interfaces/i-immobili';

@Component({
  standalone: false,
  selector: 'app-immobili',
  templateUrl: './immobili.component.html',
  styleUrl: './immobili.component.scss'
})
export class ImmobiliComponent implements OnInit {
  immobili: iImmobili[] = [];

  constructor(private immobiliService: ImmobiliService) {}

  ngOnInit(): void {
    this.loadImmobili();
  }

  loadImmobili(): void {
    this.immobiliService.getAllImmobili().subscribe(data => {
      this.immobili = data;
    }, error => {
      console.error('Errore nel recupero degli immobili', error);
    });
  }
}
