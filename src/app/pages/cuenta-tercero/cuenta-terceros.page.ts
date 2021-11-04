import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-cuenta-terceros',
  templateUrl: './cuenta-terceros.page.html',
  styleUrls: ['./cuenta-terceros.page.scss'],
})
export class CuentaTercerosPage implements OnInit {

  formTerceros: any= FormGroup;
  tipoCuenta: any;
  tipoMoneda: any;
  listaBancos: []= [];
  user_id: any;

  //Lee los cambios en los input del formulario.
  get alias(){
    return this.formTerceros.get('alias');
  }
  get nombre_banco(){
    return this.formTerceros.get('nombre_banco');
  }
  get tipo_cuenta(){
    return this.formTerceros.get('tipo_cuenta');
  }
  get numero_cuenta(){
    return this.formTerceros.get('numero_cuenta');
  }
  get moneda(){
    return this.formTerceros.get('moneda');
  }
  get identificacion_titular(){
    return this.formTerceros.get('identificacion_titular');
  }
  // Envia los posibles errores al html.
  public errorMensaje = {
    alias:[
      {type:'required', message: 'El alias es requerido.'},
    ], 
    nombre_banco:[
      {type:'required', message: 'El nombre del banco es requerido.'},
    ],
    tipo_cuenta:[
      {type:'required', message: 'El tipo de cuenta es requerido.'},
    ],
    numero_cuenta:[
      {type:'required', message: 'El número de cuenta es requerido.'},
      {type:'minlength', message: 'Se requieren 11 caracteres, por favor verifique e intente de nuevo'},
      {type:'maxlength', message: 'Se requieren 11 caracteres, por favor verifique e intente de nuevo'}
    ],
    identificacion_titular:[
      {type:'required', message: 'El password es requerido.'},
      {type:'minlength', message: 'Se requieren 12 caracteres, por favor verifique e intente de nuevo'},
      {type:'maxlength', message: 'Se requieren 12 caracteres, por favor verifique e intente de nuevo'}
    ],
    moneda:[
      {type:'required', message: 'El tipo de moneda es requerido.'},
    ],       
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private generalService: GeneralService,
    private cuentaService: CuentasService,
    private router: Router
  ) {
    this.recuperarId();
    this.crearFormulario();    
    this.listarTipoMoneda();
    this.listarTipoCuenta();
    this.listarBancos();
  }

  ngOnInit() { }

  async recuperarId(){
    await this.generalService.recuperarStorage('UserID').then(resp=>{
      this.user_id = resp;          
    }); 
  }

  crearFormulario(){
    this.formTerceros = new FormGroup({
      alias: new FormControl(),
      nombre_banco: new FormControl(),  
      tipo_cuenta: new FormControl(),
      numero_cuenta: new FormControl(),
      identificacion_titular: new FormControl(),
      moneda: new FormControl(),
      idCreador: new FormControl(),
    });
    this.formTerceros = this.fb.group({
      alias: ['',[Validators.required]],
      nombre_banco: ['',[Validators.required]],  
      tipo_cuenta: ['',[Validators.required]],
      numero_cuenta: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      identificacion_titular: ['',[Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      moneda: ['',[Validators.required]],
      idCreador: [this.user_id],      
    });    
  }

  listarTipoMoneda(){
    this.usuarioService.listarTipoMonedas().subscribe((resp: any)=>{
      this.tipoMoneda = resp;      
    })
  }

  listarTipoCuenta(){
    this.usuarioService.listarTipoCuentas().subscribe((resp: any)=>{
      this.tipoCuenta = resp;      
    })
  }

  listarBancos(){
    this.usuarioService.listarBancos().subscribe((resp: any)=>{
      Object.values(resp).map((bancos: any)=>{
        this.listaBancos= bancos
      });
    });
  }

  guardar(){    
    this.formTerceros.value.idCreador = this.user_id;
    //Segunda verificación para que se cumpla con las validaciones minimas requeridas  
    if(!this.formTerceros.valid || isNaN(this.formTerceros.value.identificacion_titular) || isNaN(this.formTerceros.value.numero_cuenta) ){     
      this.formTerceros.markAllAsTouched();
      return;
    }
    this.cuentaService.crearCuentaTerceros(this.formTerceros.value).subscribe((resp: any)=>{
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
