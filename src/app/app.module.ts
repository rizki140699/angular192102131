import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
=======
>>>>>>> 898235e496d8c8978cf05b161f7a33530eb92a82

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
<<<<<<< HEAD
    RegisterComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent
=======
    RegisterComponent
>>>>>>> 898235e496d8c8978cf05b161f7a33530eb92a82
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
