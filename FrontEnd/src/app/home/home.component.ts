import { Component, OnInit } from '@angular/core';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:BuildService) { }


  ngOnInit(): void {
  }

}
