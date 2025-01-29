import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guards/guest.guard';

const routes: Routes = [{ path: 'auth',
   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),

   },
   {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),

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

   },
    {
      path: 'immobili',
      loadChildren: () => import('./pages/immobili/immobili.module').then(m => m.ImmobiliModule),

    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
