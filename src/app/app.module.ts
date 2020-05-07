import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DestinoazulComponent } from  './destinoazul/destinoazul.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
     BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      Ng5SliderModule,
      ChartsModule,
       RouterModule.forRoot(
      [
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
    },
    {
     path:'destinoazul',
     component:DestinoazulComponent 
    }
  ]
  )],
  declarations: [ 
    AppComponent,
    HelloComponent,
    LoginComponent,
    HomeComponent, 
    StudentdetailsComponent, 
    DestinoazulComponent 
    ],
  bootstrap:[ 
    AppComponent
  ]
})
export class AppModule { }