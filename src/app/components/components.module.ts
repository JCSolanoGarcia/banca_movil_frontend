import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotterExternoComponent } from './fotter-externo/fotter-externo.component';
import { HeaderComponent } from './header/header.component';
import { FotterInternoComponent } from './fotter-interno/fotter-interno.component';



@NgModule({
  declarations: [
    FotterExternoComponent,
    HeaderComponent,
    FotterInternoComponent
  ],
  exports:[
    FotterExternoComponent,
    HeaderComponent,
    FotterInternoComponent
  ],

  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
