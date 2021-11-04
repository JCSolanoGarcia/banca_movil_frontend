import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formRegistro: any= FormGroup;
  passwordFlag: boolean= false;
  passwordType: string = 'password';
  listaTipoId: any;

  //Lee los cambios en los input del formulario.
  get tipoIdentificacion(){
    return this.formRegistro.get('tipoIdentificacion');
  }
  get numeroIdentificacion(){
    return this.formRegistro.get('numeroIdentificacion');
  }
  get password(){
    return this.formRegistro.get('password');
  }
  get nombreCliente(){
    return this.formRegistro.get('nombreCliente');
  }
  // Envia los posibles errores al html.
  public errorMensaje = {
    tipoIdentificacion:[
      {type:'required', message: 'El número de identificación es requerido.'},
    ],
    nombreCliente:[
      {type:'required', message: 'El nombre es requerido.'},
    ],  
    numeroIdentificacion:[
      {type:'required', message: 'El número de identificación es requerido.'},
      {type:'minlength', message: 'Datos incorrectos, se requiere mínimo 6 números.' }
    ],
    password:[
      {type:'required', message: 'El password es requerido.'},
      {type:'minlength', message: 'Minimo 8 caracteres, por favor verifique e intente de nuevo'}
    ],       
  }
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private generalService: GeneralService,
  ) {
    this.crearFormulario();
    this.listarTipoID();
   }

  ngOnInit() {
  }

  //Crea el formulario de captura de información
  crearFormulario(){
    this.formRegistro = new FormGroup({
      tipoIdentificacion: new FormControl(),
      numeroIdentificacion: new FormControl(),  
      password: new FormControl(),
      nombreCliente: new FormControl(),
    });
    this.formRegistro = this.fb.group({
      tipoIdentificacion: ['',[Validators.required]],       
      password: ['', [Validators.required, Validators.minLength(8)]],
      numeroIdentificacion: ['', [Validators.required, Validators.minLength(6)]],
      nombreCliente: ['',[Validators.required]],
    });    
  }

  //Lista los tipos de identificación para mostrarlos en el selector
  listarTipoID(){
    this.usuarioService.listarTipoIdentificacion().subscribe((resp:any)=>{
      this.listaTipoId = resp;
    }, error=>{
      console.log(<any>error);      
    })
  }

  //Esta función cambia el icono del ojo junto al password 
  //al igual que el tipo de input para poder ver su contenido
  changeType(){
    if(this.passwordFlag){
      this.passwordFlag = false;
      this.passwordType = 'password';
    }else{
      this.passwordFlag = true;
      this.passwordType = 'text';
    }
  }

  //Esta función guarda la información registrada en el formulario.
  guardar(){ 
    //Segunda verificación para que se cumpla con las validaciones minimas requeridas  
    if(!this.formRegistro.valid || (this.formRegistro.value.numeroIdentificacion).length < 6 || isNaN(this.formRegistro.value.numeroIdentificacion) ){     
      this.formRegistro.markAllAsTouched();
      return;
    }
    //Completa con ceros para cumplir con la longitud solicitada en el número de identificación
    this.formRegistro.value.numeroIdentificacion = this.formRegistro.value.numeroIdentificacion.padStart(12,'0');
    //Crea el registro en la BD
    this.usuarioService.crearUsuario(this.formRegistro.value).subscribe((resp: any)=>{
      //Verifica que respuesta se recibe desde el back para mostrar una alerta diferente en cada caso
      if(resp == 'Usuario creado exitosamente'){
        this.generalService.presentAlert('Atención', resp)
      }else{
        Object.values(resp).map(dato=>{
          this.generalService.presentAlert('error', dato[0].msg)       
        })
      }    
    }, error=>{
      console.log(error.error);      
    });    
  }

}
