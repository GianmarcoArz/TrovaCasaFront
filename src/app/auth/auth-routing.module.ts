import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfiloComponent } from '../pages/profilo/profilo.component';
import { ImmobiliComponent } from '../pages/immobili/immobili.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  {path:'profilo',component:ProfiloComponent},
  {path:'immobili',component:ImmobiliComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
