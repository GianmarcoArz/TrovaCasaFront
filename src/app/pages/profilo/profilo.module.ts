import { CommonModule } from "@angular/common";
import { ProfiloComponent } from "./profilo.component";
import { NgModule } from "@angular/core";
import { ProfiloRoutingModule } from "./profilo.routing-module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ProfiloComponent
  ],
  imports: [
    CommonModule,
    ProfiloRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfiloModule { }
