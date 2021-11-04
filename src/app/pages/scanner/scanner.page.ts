import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  @Input() numero_cuenta: string;
  @Input() nombre_banco : string;
  @Input() alias: string;
  @Input() identificacion_titular : string;
  @Input() moneda: string;
  @Input() tipo_cuenta : string;

  title: any;
  elementType: any;
  value: any;
  correctionLevel: any;

  constructor(
    private modalCtrl: ModalController    
  ) { }

  ngOnInit() {
    this.title = 'app';
    this.elementType = 'QR_CODE';
    this.value = `${this.alias}-${this.nombre_banco}-${this.tipo_cuenta}-${this.numero_cuenta}-${this.identificacion_titular}-${this.moneda}`;
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
 

}
