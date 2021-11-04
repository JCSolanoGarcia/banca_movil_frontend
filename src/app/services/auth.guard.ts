import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: GeneralService,
    private router: Router,
  )
  {
    this.auth.estaAutenticado();
  }
  /* canActivate():  boolean  {
    console.log('aqui');
    
    if(this.auth.estaAutenticado()){
      console.log('aqui 1');
      return true;      
    }else{
      console.log('Hola mundo');
      this.router.navigateByUrl('/inicio');
      return false;
    }    
  } */

  /* async redirect(): Promise<boolean>{
    console.log('hola');    
    return await this.auth.estaAutenticado();    
  } */
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {         
      return this.auth.estaAutenticado();      
  }
  
}
