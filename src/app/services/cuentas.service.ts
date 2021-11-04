import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CuentaInterface } from '../interfaces/cuenta-interface';
import { MovimientoInterface } from '../interfaces/movimiento-interface';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  conexion: any;

  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
  ) {
    this.conexion = this.generalService.URL;
  } 

  listarCuentasPropias(id: any){   
    return this.http.get(`${this.conexion}/api/cuentas/${id}`);
  }
  
  crearCuentaTerceros(data: CuentaInterface){
    return this.http.post(`${this.conexion}/api/cuentas/`, data);
  }

  listarCuentasTerceros(data: any){
    return this.http.get(`${this.conexion}/api/cuentas/usuario/${data}`);
  }
  
  listarCuentaTercero(data: any){
    return this.http.get(`${this.conexion}/api/cuentas/tercero/${data}`);
  }

  actualizarCuentasPropias(id: any, data: any){
    return this.http.put(`${this.conexion}/api/cuentas/${id}`, data);
  }

  crearMovimiento(data: MovimientoInterface){
    return this.http.post(`${this.conexion}/api/movimiento`, data);
  }  

}
