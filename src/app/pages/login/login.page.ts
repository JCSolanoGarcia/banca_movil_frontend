import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: any= FormGroup;
  passwordFlag: boolean= false;
  passwordType: string = 'password';
  flag: boolean = false;
  listaTipoId: any;

  get tipoIdentificacion(){
    return this.formLogin.get('tipoIdentificacion');
  }
  get numeroIdentificacion(){
    return this.formLogin.get('numeroIdentificacion');
  }
  get password(){
    return this.formLogin.get('password');
  }

  public errorMensaje = {
    tipoIdentificacion:[
      {type:'required', message: 'El número de identificación es requerido.'},
    ],  
    numeroIdentificacion:[
      {type:'required', message: 'El número de identificación es requerido.'},
      {type:'minlength', message: 'Datos incorrectos, se requiere mínimo 6 números.' },
      {type:'maxlength', message: 'Datos incorrectos, se requiere máximo 12 números.' }
    ],
    password:[
      {type:'required', message: 'El password es requerido.'},
      {type:'minlength', message: 'Minimo 8 caracteres, por favor verifique e intente de nuevo'}
    ],       
  }

  constructor(
    private fb : FormBuilder,
    private usuarioService: UsuariosService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    this.crearFormulario();
    this.listarTipoId();
   }

  ngOnInit() {
  }

  crearFormulario(){
    this.formLogin = new FormGroup({
      tipoIdentificacion: new FormControl(),
      numeroIdentificacion: new FormControl(),  
      password: new FormControl(),
    });
    this.formLogin = this.fb.group({
      tipoIdentificacion: ['',[Validators.required]],       
      password: ['', [Validators.required, Validators.minLength(8)]],
      numeroIdentificacion: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
    });    
  }

  listarTipoId(){
    this.usuarioService.listarTipoIdentificacion().subscribe((resp: any)=>{
      this.listaTipoId = resp;
    }, error=>{
      console.log(<any>error);      
    });
  }
  
  changeType(){
    if(this.passwordFlag){
      this.passwordFlag = false;
      this.passwordType = 'password';
    }else{
      this.passwordFlag = true;
      this.passwordType = 'text';
    }
  }

  guardar(){ 
    //Segunda verificación para que se cumpla con las validaciones minimas requeridas 
    if(!this.formLogin.valid || (this.formLogin.value.numeroIdentificacion).length < 6 || isNaN(this.formLogin.value.numeroIdentificacion) ){     
      this.formLogin.markAllAsTouched();
      return;
    }

    //Completa con ceros para cumplir con la longitud solicitada en el número de identificación
    this.formLogin.value.numeroIdentificacion = this.formLogin.value.numeroIdentificacion.padStart(12,'0');
    this.usuarioService.loginUsuario(this.formLogin.value).subscribe((resp: any)=>{
      let aux ;
      Object.values(resp).map((a: any)=>{
        aux = this.generalService.recuperarID(a);
        this.generalService.guardarStorage('token', a);
      });   
      this.generalService.guardarStorage('UserID', aux.uid); 
      this.router.navigateByUrl('/home');
    },error=>{
      //console.log(error); 
      this.generalService.presentAlert('error', 'Datos suministrados no corresponden.')     
    });
  }

  

  


}
