import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CuentasService } from 'src/app/services/cuentas.service';

import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ConfirmacionPage } from '../confirmacion/confirmacion.page';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.page.html',
  styleUrls: ['./movimiento.page.scss'],
})
export class MovimientoPage implements OnInit {

  id_cuenta: any;
  cuentaTercero: any =[];
  user_id: any;
  cuentas: any;
  formTransferir: any =FormGroup;
  disponible : number;
  usuario: any;
  movimiento: any;
  origen: any;

  get cuenta_origen(){
    return this.formTransferir.get('cuenta_origen');
  }
  get monto(){
    return this.formTransferir.get('monto');
  }
  
  // Envia los posibles errores al html.
  public errorMensaje = {
    cuenta_origen:[
      {type:'required', message: 'La cuenta origen es requerida.'},
    ], 
    monto:[
      {type:'required', message: 'El valor a transferir es requerido.'},
    ],       
  }

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private generalService: GeneralService,
    private fb: FormBuilder,
    private cuentaService: CuentasService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {
    this.crearFormulario();     
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.id_cuenta = params['id']);
    console.log(this.id_cuenta);
    
    this.recuperarID();       
  }

  recuperarID(){
    this.generalService.recuperarStorage('UserID').then(resp=>{
      this.user_id = resp;    
      this.buscarUsuario();
      this.listarMisCuentas(this.id_cuenta);
    }); 
  }

  crearFormulario(){
    this.formTransferir = new FormGroup({
      cuenta_origen: new FormControl(),
      cuenta_destino: new FormControl(),  
      monto: new FormControl(),
      saldo: new FormControl(),
    });
    this.formTransferir = this.fb.group({
      cuenta_origen: ['',[Validators.required]],       
      monto: ['', [Validators.required]],
      cuenta_destino: ['',],
      saldo: ['',],
    });    
  }

  buscarUsuario(){
    this.usuarioService.listarUsusario(this.user_id).subscribe((resp: any)=>{
      this.usuario= resp;      
      this.listarCuentasPersonales(this.usuario.numeroIdentificacion);
    })
  }

  listarCuentasPersonales(id){
    this.cuentaService.listarCuentasPropias(id).subscribe((resp: any)=>{    
      this.cuentas = Object.values(resp) ;            
    }, error=>{
      console.log(error);      
    })
  }

  listarMisCuentas(id){
    console.log(id);    
    this.cuentaService.listarCuentaTercero(id).subscribe((resp: any)=>{   
      this.cuentaTercero  = Object.values(resp);
      this.formTransferir.controls.cuenta_destino.value = this.cuentaTercero[0].numero_cuenta;    
    }, error=>{
      console.log(error);      
    })
  } 

  valor(evt){
    for(let item of this.cuentas){
      if(item.numero_cuenta == evt){        
        this.disponible = item.saldo;
        this.origen = item._id;
      }      
    }    
  }

  async debitar(){
    //Verificar saldo  
    if(this.formTransferir.value.monto > this.disponible){ 
      await this.generalService.presentAlert('Rechazo', 'Fondos insuficientes');   
    }else{
      //Se realiza el debito a la cuenta
      let nuevoSaldo = this.disponible - this.formTransferir.value.monto;
      this.formTransferir.value.saldo =  nuevoSaldo;
      this.crearMovimiento( nuevoSaldo);      
    }
  }

  async crearMovimiento(saldo : number){
    //Se registra el movimiento en la BD
    this.cuentaService.crearMovimiento(this.formTransferir.value).subscribe((resp: any)=>{
      this.movimiento = resp;
      let data ={
        saldo : saldo,
        idMovimiento: this.movimiento
      }  
      this.actualizarCuenta(data);          
    }, error=>{
      console.log(error);      
    });  
  }

  actualizarCuenta(data: any){
    //Se actualiza el saldo y se relaciona el movimiento en la cuenta.
    this.cuentaService.actualizarCuentasPropias(this.origen, data ).subscribe((resp: any)=>{      
      this.confirmacion(resp);
      this.router.navigateByUrl('/home');        
    }, error =>{
      console.log(error);      
    });
  }

  async confirmacion(cuenta: any){
    const modal = await this.modalCtrl.create({
      component: ConfirmacionPage,
      componentProps:{
        'label':this.formTransferir.value.cuenta_origen,
        'label1':this.formTransferir.value.cuenta_destino,
        'label2':this.formTransferir.value.monto,
        'label3':cuenta.moneda,
        'label4':this.movimiento,
      },
      cssClass: 'my-custom-class-emergente',
      swipeToClose: true,
      keyboardClose: true
    });
    return await modal.present();
  }

}
