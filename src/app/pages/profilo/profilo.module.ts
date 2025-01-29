import { CommonModule } from "@angular/common";
import { ProfiloComponent } from "./profilo.component";
import { NgModule } from "@angular/core";
import { ProfiloRoutingModule } from "./profilo.routing-module";


@NgModule({
  declarations: [
    ProfiloComponent
  ],
  imports: [
    CommonModule,
    ProfiloRoutingModule
  ]
})
export class ProfiloModule { }
