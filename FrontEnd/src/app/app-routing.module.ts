import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildpizzaComponent } from './buildpizza/buildpizza.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderpizzaComponent } from './orderpizza/orderpizza.component';
import { LoginComponent } from './user/login/login.component';
import { SignpComponent } from './user/signp/signp.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'order',
    component:OrderpizzaComponent
  },
  {
    path:'getAllIngredients',
    component:BuildpizzaComponent
  },
  {
    path:'carts',
    component:CartComponent
  },
  {
    path:'signup',
    component:SignpComponent
  },{
    path:'login',
    component:LoginComponent

  },
  {
    path:"**",
    component:HomeComponent
  },
  {
    path:"",
    redirectTo:"HomeComponent",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
