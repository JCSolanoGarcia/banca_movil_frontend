import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { CuentasService } from 'src/app/services/cuentas.service';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {

  user_id: any;
  listaCuentas: any;
  nueva_cuenta: any ={
    'alias':'',
    'numero_cuenta':'',
    'nombre_banco':'',
    'identificacion_titular':'',
    'tipo_cuenta':'',
    'moneda':'',
    'idCreador':'',
  }

  constructor(
    private generalService: GeneralService,
    private cuentaService: CuentasService,
    private barcodeScanner: BarcodeScanner,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.recuperarId();
  }

  ngOnInit() {}

  recuperarId(){
    this.generalService.recuperarStorage('UserID').then(resp=>{
      this.user_id = resp;             
      this.listarMisCuentas(this.user_id);   
    });
  }

  listarMisCuentas(id){
    this.cuentaService.listarCuentasTerceros(id).subscribe((resp: any)=>{  
      this.listaCuentas = resp;      
    }, error=>{
      console.log(error);      
    })
  }
  
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let aux: any =[];            
      aux.push((barcodeData.text).split('-'));
      aux.map((item: any)=>{
        if(item.length == 6){        
          this.nueva_cuenta.alias = item[0];
          this.nueva_cuenta.nombre_banco = item[1];
          this.nueva_cuenta.tipo_cuenta = item[2];
          this.nueva_cuenta.numero_cuenta = item[3];
          this.nueva_cuenta.identificacion_titular = item[4];
          this.nueva_cuenta.moneda = item[5];
          this.nueva_cuenta.idCreador = this.user_id;
          console.log('datos para enviar', this.nueva_cuenta);
          this.traferenciaPorQR();        
        }else{
          this.generalService.presentAlert('Error', 'Código QR en formato no valido');
        }
      })      
    }).catch(err => {
        console.log('Error', err);
    });
  }

  traferenciaPorQR(){
    this.cuentaService.crearCuentaTerceros(this.nueva_cuenta).subscribe((resp: any)=>{
      console.log( resp);      
      let aux;
      Object.keys(resp).map(a=>{
        aux = a;
      });
      let data ={
        cuentasTerceros: resp._id
      }
      if(aux != 'errors'){
        this.generalService.presentAlert('Atención', 'Cuenta inscrita de manera exitosa');
        this.actualizarUsuario(data, resp.idCreador);
      }else{
        Object.values(resp).map(dato=>{
          this.generalService.presentAlert('error', dato[0].msg)       
        })
      }
    }, error=>{
      console.log(error.error);      
    });
  }

  actualizarUsuario(data: any, id: string){
    this.usuarioService.actualizarCuentaUsuario(data, id).subscribe((resp: any)=>{
      console.log(resp);
      this.router.navigateByUrl('/transferencias');
    }, error=>{
      console.log(error);          
    })
  }
}
