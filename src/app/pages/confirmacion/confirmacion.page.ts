import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  @Input() label: string;
  @Input() label1: string;
  @Input() label2: string;
  @Input() label3: string;
  @Input() label4: string;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
