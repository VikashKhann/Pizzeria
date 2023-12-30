import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-buildpizza',
  templateUrl: './buildpizza.component.html',
  styleUrls: ['./buildpizza.component.css']
})
export class BuildpizzaComponent implements OnInit {
  inglist:any;
  Price : number=0;

  constructor(private ingservice:BuildService) { }

  ngOnInit(): void {
    this.ingservice.getingredients().subscribe((data)=>{
      this.inglist=data;
    })
  }

  checkfun(e:any,num:number){
    if(e.target.checked){       
      this.Price=this.Price+num; 
    }
    else{
      this.Price=this.Price-num;
    }
  }
}
