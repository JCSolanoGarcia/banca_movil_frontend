import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaTercerosPage } from './cuenta-terceros.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaTercerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaTercerosPageRoutingModule {}
