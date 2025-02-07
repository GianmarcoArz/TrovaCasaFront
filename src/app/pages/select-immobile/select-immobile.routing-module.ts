import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SelectImmobileComponent } from "./select-immobile.component";


const routes: Routes = [{ path: '', component: SelectImmobileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectImmobileRoutingModule { }
