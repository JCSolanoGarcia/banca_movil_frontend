import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public platform: Platform,
  ) { }

  ngOnInit() {}

  salir(){
    navigator["app"].exitApp();
  } 

}
