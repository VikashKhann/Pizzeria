import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/build.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  res:any;
  uname:any;
  useremail:any;;


  model ={
    email : '',
    password : ''
      };
    
      errorMsg : string="";
      runtimeToken : string="";

  constructor(private service:BuildService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form : NgForm){
    this.service.sendlogin(form.value).subscribe((res:any)=>{
      console.log(JSON.stringify(res));
      if(res.error==='Invalid Email'){
        alert("invalid e mail")
      }
      else if(res.error==='Incorrect password!!'){
        alert("invalid password")
      }
      else{
           
          console.log(res)
            // this.runtimeToken=res.token;
            // console.log(this.runtimeToken);
            this.service.setToken(res['token']);
            this.useremail=form.value.email;
            console.log(this.useremail);
            this.router.navigateByUrl('home');
            console.log(JSON.stringify(res))
            this.uname=res;
            alert("User login successfully");
        
      }
})
}

}
