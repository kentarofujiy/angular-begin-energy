import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { }
  students = [
    {
      firstname:'mutyam',
      lastname:'abcd',
      location: 'vijayanagaram',
      intrest:'cricket'
    },
    {
      firstname:'naresh',
      lastname:'reddy',
      location: 'gachibowli',
      intrest:'poetry'
    },
    {
      firstname:'Akhil',
      lastname:'reddy',
      location: 'warangal',
      intrest:'politics'
    },
    {
      firstname:'sucharita',
      lastname:'sai',
      location: 'hyderabad',
      intrest:'Movies'
    }
  ]
  ngOnInit() {
  }
  gotoLogin(){
    this.router.navigate(['/'])
  }
}