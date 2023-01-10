import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { LoginComponent } from './login/login.component';
import { MahasiswaComponent } from './mahasiswa/mahasiswa.component';
import { OtentikasiGuard } from './otentikasi.guard';
import { RegisterComponent } from './register/register.component';
import { ForexComponent } from './forex/forex.component';
import { CuacaComponent } from './cuaca/cuaca.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [OtentikasiGuard]
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
    canActivate: [OtentikasiGuard]
  },
  {
    path: 'mahasiswa',
    component: MahasiswaComponent,
    canActivate: [OtentikasiGuard]
  },
  {
    path: 'forex',
    component: ForexComponent,
    canActivate: [OtentikasiGuard]
  },
  {
    path: 'cuaca',
    component: CuacaComponent,
    canActivate: [OtentikasiGuard]
  }
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
