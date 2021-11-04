import { Component, OnInit } from '@angular/core';
import { CuentasService } from 'src/app/services/cuentas.service';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cuentas: []= [];
  user_id: any;
  constructor(
    private usuarioService : UsuariosService,
    private generalService: GeneralService,
    private cuentaService: CuentasService,
  ) {  }

  ngOnInit() {    
  }

  ionViewWillEnter(){
    this.recuperarId();
  }

  recuperarId(){
    this.generalService.recuperarStorage('UserID').then(resp=>{
      this.user_id = resp;    
      this.buscarUsuario();
    });
  }

  buscarUsuario(){
    this.usuarioService.listarUsusario(this.user_id).subscribe((resp: any)=>{      
      this.listarMisCuentas(resp.numeroIdentificacion);
    })
  }

  listarMisCuentas(id){    
    this.cuentaService.listarCuentasPropias(id).subscribe((resp: any)=>{            
      this.cuentas = resp;      
    }, error=>{
      console.log(error);      
    })
  }
}
