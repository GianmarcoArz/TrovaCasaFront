import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SelectImmobileComponent } from "./select-immobile.component";
import { SelectImmobileRoutingModule } from "./select-immobile.routing-module";



@NgModule({
  declarations: [
    SelectImmobileComponent
  ],
  imports: [
    CommonModule,
    SelectImmobileRoutingModule
  ]
})
export class SelectImmobileModule { }
