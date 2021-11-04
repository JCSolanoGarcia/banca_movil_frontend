import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  URL = 'http://192.168.1.52:8080';
  respuestaStorage: any;
  userToken: any;
 
  private _storage: Storage | null = null;

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router,
  ) {    
    this.init();
    this.estaAutenticado();
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  guardarStorage(name: string, info: string){
    this.storage.set(name , info);
  }

  async recuperarStorage(name: string){    
    return this.respuestaStorage = await this.storage.get(name);
  }

  async estaAutenticado():Promise<boolean>{
    this.userToken = await this.storage.get('token');
    if(this.userToken == null){
      this.router.navigateByUrl('/login');
      return false;
    }   
    const expira =  this.recuperarID(this.userToken);       
    const expiraDate = new Date();
    expiraDate.setTime(Number(expira.exp*1000));
    if(expiraDate > new Date()){      
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }    
  }

  recuperarID(token: any){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
