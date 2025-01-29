import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImmobiliComponent } from "./immobili.component";
import { ImmobiliRoutingModule } from "./immobili-routing.module";


@NgModule({
  declarations: [
    ImmobiliComponent
  ],
  imports: [
    CommonModule,
    ImmobiliRoutingModule
  ]
})
export class ImmobiliModule { }
