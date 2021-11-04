import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GeneralService } from './general.service';
import { ClienteInterface } from '../interfaces/cliente-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  conexion : any;
  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
  ) {
    this.conexion = this.generalService.URL;
  } 
  
  listarUsusario(id: string){
    return this.http.get(`${this.conexion}/api/usuarios/${id}`);
  }

  crearUsuario(data: ClienteInterface){
    return this.http.post(`${this.conexion}/api/usuarios/`, data);
  }

  actualizarCuentaUsuario(data: any, id: string){
    return this.http.put(`${this.conexion}/api/usuarios/${id}`, data);
  }

  loginUsuario(data: ClienteInterface){    
    return this.http.post(`${this.conexion}/api/auth/login/`, data);
  } 

  listarTipoMonedas(){
    return this.http.get(`${this.conexion}/api/moneda/`);
  }

  listarTipoCuentas(){
    return this.http.get(`${this.conexion}/api/tipoCuenta/`);
  }

  listarBancos(){
    return this.http.get(`${this.conexion}/api/bancos/`);
  }

  listarTipoIdentificacion(){
    return this.http.get(`${this.conexion}/api/tipoId/`);
  }

}
