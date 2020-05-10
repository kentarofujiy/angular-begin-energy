import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CalculoComponent } from './calculo/calculo.component';
import { SimulacaoAzulComponent } from './simulacao-azul/simulacao-azul.component';
import { DestinoazulComponent } from  './destinoazul/destinoazul.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { DynamicFormQuestionComponent } from './shared/dynamic-form-question.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartsModule } from 'ng2-charts';
import { OrigemVerdeGetHistoryService } from './shared/origem-verde-get-history.service'



@NgModule({
  imports: [
     BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      Ng5SliderModule,
      ChartsModule,
      HttpClientModule,
       RouterModule.forRoot(
      [
    {
      path: '',
      component: SimulacaoAzulComponent
     // path:'',
     // component:LoginComponent
    },
    {
       path:'login',
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
    },
    {
    path: 'calculos',
    component:CalculoComponent
    },
    {
    path:'simulacaoazul',
    component:SimulacaoAzulComponent
    }
  ]
  )],
  declarations: [ 
    AppComponent,
    HelloComponent,
    LoginComponent,
    HomeComponent, 
    StudentdetailsComponent, 
    DestinoazulComponent,
    DynamicFormQuestionComponent,
    CalculoComponent,
    SimulacaoAzulComponent,
    ],
  bootstrap:[ 
    AppComponent
  ],
  providers: [OrigemVerdeGetHistoryService]
})
export class AppModule { }
