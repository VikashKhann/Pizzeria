import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:BuildService, private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.deleteToken();
    this.router.navigateByUrl('login');
  }
}
