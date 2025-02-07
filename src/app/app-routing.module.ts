import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { GuestGuard } from './auth/guards/guest.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard], // Solo per utenti non loggati
    canActivateChild: [GuestGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard], // Solo per utenti loggati
    canActivateChild: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'profilo',
    loadChildren: () => import('./pages/profilo/profilo.module').then(m => m.ProfiloModule),
    canActivate: [AuthGuard], // Solo per utenti loggati
    canActivateChild: [AuthGuard]
  },
  {
    path: 'immobili',
    loadChildren: () => import('./pages/immobili/immobili.module').then(m => m.ImmobiliModule),
    canActivate: [AuthGuard], // Solo per utenti loggati
    canActivateChild: [AuthGuard]

  },
  {
    path: 'single-immobile',
    loadChildren: () => import('./pages/select-immobile/select-immobile.module').then(m => m.SelectImmobileModule),
    canActivate: [AuthGuard], // Solo per utenti loggati
    canActivateChild: [AuthGuard]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
