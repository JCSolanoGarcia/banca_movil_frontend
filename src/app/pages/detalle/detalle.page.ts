import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CuentasService } from 'src/app/services/cuentas.service';
import { ScannerPage } from '../scanner/scanner.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id_cuenta: any;
  cuenta: any ;
  datos_cuenta: any;
  constructor(
    private route: ActivatedRoute,
    private cuentaService : CuentasService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id_cuenta = params['id']);
    this.listarMisCuentas(this.id_cuenta);
  }

  listarMisCuentas(id){    
    this.cuentaService.listarCuentaTercero(id).subscribe((resp: any)=>{
      this.datos_cuenta = resp[0];
      console.log(this.datos_cuenta); 
      Object.values(resp).map((item:any)=>{
        this.cuenta = item.idMovimiento;
      })        
    }, error=>{
      console.log(error);      
    })
  } 
  async qrCode(){    
      const modal = await this.modalCtrl.create({
        component: ScannerPage,
        componentProps:{
          'numero_cuenta':this.datos_cuenta.numero_cuenta,
          'alias':this.datos_cuenta.alias,
          'nombre_banco':this.datos_cuenta.nombre_banco,
          'tipo_cuenta':this.datos_cuenta.tipo_cuenta,
          'identificacion_titular':this.datos_cuenta.identificacion_titular,
          'moneda':this.datos_cuenta.moneda,
        },
        cssClass: 'my-custom-class-scanner',
        swipeToClose: true,
        keyboardClose: true
      });
      return await modal.present();    
  }

}
