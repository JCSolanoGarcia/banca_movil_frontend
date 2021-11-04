import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaTercerosPageRoutingModule } from './cuenta-terceros-routing.module';

import { CuentaTercerosPage } from './cuenta-terceros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CuentaTercerosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CuentaTercerosPage]
})
export class CuentaTercerosPageModule{}
