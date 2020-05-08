import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.css']
})
export class CalculoComponent implements OnInit {
  frase = '';
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    this.frase = "ola";
  }

}