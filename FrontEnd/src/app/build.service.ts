import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  ingurl:string="http://localhost:3200/getAllIngredients"
  pizzaurl:string="http://localhost:3200/getAllPizza"
  cartaddurl:string="http://localhost:3200/addcart"
  getcarturl:string="http://localhost:3200/getcart"
  deletecarturl:string="http://localhost:3200/deletecart"
  adduserurl:string="http://localhost:3200/register"
  loginurl:string="http://localhost:3200/login"
  getnameurl:string="http://localhost:3200/username"
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private client:HttpClient) { }

  getingredients(){
    return this.client.get(this.ingurl)
  }
  getpizza(){
    return this.client.get(this.pizzaurl)
  }

  addtocart(body:any){
    return this.client.post(this.cartaddurl,body)
  }

  getcartdata(){
    return this.client.get(this.getcarturl)
  }

  deletecartitem(body:any){
    return this.client.post(this.deletecarturl,body)
  }

  adduseritem(body:any){
    return this.client.post(this.adduserurl,body)
  }

  sendlogin(body:any){
    return this.client.post(this.loginurl,body)
  }

  getusername(){
    return this.client.get(this.getnameurl)
  }

  getToken()
    {
     return localStorage.getItem('token')
    }

    setToken(token : string){
      localStorage.setItem('token',token)
    }

    deleteToken()
    {
      localStorage.removeItem('token');
    }

    getUserPayload()
    {
      var token = this.getToken()
      //var token = localStorage.getItem('token');
      if(token)
      {
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else
      {
        return null;
      }
    }

    isLoggedIn(){
      var userPayload = this.getUserPayload();
      console.log(userPayload)
      if(userPayload)
      return userPayload.exp > Date.now() /1000;
      else
      return false
    }


}
