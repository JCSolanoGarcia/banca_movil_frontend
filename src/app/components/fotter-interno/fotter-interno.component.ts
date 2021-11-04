import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotter-interno',
  templateUrl: './fotter-interno.component.html',
  styleUrls: ['./fotter-interno.component.scss'],
})
export class FotterInternoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  irMenu(){
    this.router.navigateByUrl('/home');
  }

  irTransferencias(){
    this.router.navigateByUrl('/transferencias')
  }

  irPagos(){
    this.router.navigateByUrl('/nuevo')
  }

  irMas(){
    this.router.navigateByUrl('/nuevo')
  }
}
