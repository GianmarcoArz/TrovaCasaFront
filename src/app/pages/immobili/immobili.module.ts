import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImmobiliComponent } from "./immobili.component";
import { ImmobiliRoutingModule } from "./immobili-routing.module";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ImmobiliComponent
  ],
  imports: [
    CommonModule,
    ImmobiliRoutingModule,
    FormsModule
  ]
})
export class ImmobiliModule { }
