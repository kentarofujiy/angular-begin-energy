import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot([
    {
      path:'',
      component:LoginComponent
    },
    {
      path:'home',
      component:HomeComponent
    },
    {
      path:'studentdetails/:fn/:ln/:loc/:int',
      component:StudentdetailsComponent
    }

  ]) ],
  declarations: [ AppComponent, HelloComponent, LoginComponent, HomeComponent, StudentdetailsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
