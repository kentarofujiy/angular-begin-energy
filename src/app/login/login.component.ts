import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router) { }
  username;
  password;
  login(){
    if(this.username==='kentaro' && this.password=='123'){
      this.router.navigate(['/home'])
    }
    else{
      alert("Wrong details");
    }
  }
  ngOnInit() {
  }

}