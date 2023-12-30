import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BuildService } from 'src/app/build.service';
@Component({
  selector: 'app-signp',
  templateUrl: './signp.component.html',
  styleUrls: ['./signp.component.css']
})
export class SignpComponent implements OnInit {
  name:string="";
  email:string="";
  password:string="";
  //contact:number=0;

  success:boolean=false;
  errorFlag:string="";
  constructor(private service:BuildService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.service.adduseritem(form.value).subscribe((data)=>{
      alert("User added successfully");
    })
  }
}
