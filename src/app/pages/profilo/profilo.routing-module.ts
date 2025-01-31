import { RouterModule, Routes } from "@angular/router";
import { ProfiloComponent } from "./profilo.component";
import { NgModule } from "@angular/core";


const routes: Routes = [{ path: '', component: ProfiloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfiloRoutingModule { }
