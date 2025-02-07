import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmobiliComponent } from './immobili.component';
import { SelectImmobileComponent } from '../select-immobile/select-immobile.component';

const routes: Routes = [{ path: '', component: ImmobiliComponent },
  { path: ':immobileId', component: SelectImmobileComponent } // Aggiungi questa riga

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImmobiliRoutingModule { }
