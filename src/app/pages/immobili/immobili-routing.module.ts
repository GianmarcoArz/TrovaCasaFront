import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmobiliComponent } from './immobili.component';

const routes: Routes = [{ path: 'immobili', component: ImmobiliComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImmobiliRoutingModule { }
