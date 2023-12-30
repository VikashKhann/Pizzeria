import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';
import { LoginComponent } from '../user/login/login.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartlist:any;
  uemail:any;
  quantity:number=1;
  totalprice:number=0;
  constructor(private cartservice:BuildService,private email:LoginComponent) { }

  ngOnInit(): void {
    this.cartservice.getcartdata().subscribe((data)=>{
      this.cartlist=data;
      this.uemail=this.email.useremail;
      console.log(this.cartlist);
      this.cartlist.forEach((value: any)=>{
        this.totalprice = this.totalprice + value.price
      })
    })

    // this.cartlist.forEach((value: any)=>{
    //   this.totalprice = this.totalprice + value.price
    // })

    this.uemail=this.email.useremail;
    //console.log(this.uemail);
  }

  deletepizza(pizza:any){
    this.cartservice.deletecartitem(pizza).subscribe((dat)=>{
      alert("Item Deleted Successfully!")
    })
  }

  incquant(){
    this.quantity=this.quantity+1;
  }

  decquant(){
    if(this.quantity <= 0){
      alert("quantity cant be less than 1")
    }else{
    this.quantity=this.quantity-1;
    }
  }
}
