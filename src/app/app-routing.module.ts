import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transferencias',
    loadChildren: () => import('./pages/transferencias/transferencias.module').then( m => m.TransferenciasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cuenta-terceros',
    loadChildren: () => import('./pages/cuenta-tercero/cuenta-terceros.module').then( m => m.CuentaTercerosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'movimiento/:id',
    loadChildren: () => import('./pages/movimiento/movimiento.module').then( m => m.MovimientoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle/:id',
    loadChildren: () => import('./pages/detalle/detalle.module').then( m => m.DetallePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'otros',
    loadChildren: () => import('./pages/otros/otros.module').then( m => m.OtrosPageModule)
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./pages/nuevo/nuevo.module').then( m => m.NuevoPageModule),
    canActivate: [AuthGuard]
  },
 /*  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then( m => m.ScannerPageModule),
    canActivate: [AuthGuard]
  }, */
  /* {
    path: 'confirmacion',
    loadChildren: () => import('./pages/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule),
    canActivate: [AuthGuard]
  }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
