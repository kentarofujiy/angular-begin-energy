import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit {

  constructor(public ar:ActivatedRoute) { }
  student;
  ngOnInit() {
    this.ar.params.subscribe((p)=>{
      console.log(p);
      this.student = p;
    })
  }

}