import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotter-externo',
  templateUrl: './fotter-externo.component.html',
  styleUrls: ['./fotter-externo.component.scss'],
})
export class FotterExternoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  irInicio(){
    this.router.navigateByUrl('/login')
  }

  irNovedades(){
    this.router.navigateByUrl('/otros')
  }

  irPromociones(){
    this.router.navigateByUrl('/otros')
  }

  irMas(){
    this.router.navigateByUrl('/otros')
  }

}
