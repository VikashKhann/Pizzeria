import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-orderpizza',
  templateUrl: './orderpizza.component.html',
  styleUrls: ['./orderpizza.component.css']
})
export class OrderpizzaComponent implements OnInit {
  pizzalist:any;

  constructor(private pizzaservice:BuildService) { }

  ngOnInit(): void {
    this.pizzaservice.getpizza().subscribe((data)=>{
      this.pizzalist=data;
    })

  }

  savedata(pizza:any){
    // let body={
    //   empid:this.empid,
    //   name:this.name,
    //   project:this.project
    // }

    this.pizzaservice.addtocart(pizza).subscribe((dat)=>{
      alert("Pizza added to cart")
    })
  }


}
