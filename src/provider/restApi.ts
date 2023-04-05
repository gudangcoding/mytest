import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
@Injectable()
export class restApi{
    
    server : string = "http://103.140.79.246:8080/apcon/api/";
    gambar : string = "http://103.140.79.246:8080/apcon/api/upload/";
    // server : string = "http://localhost/apcon/api/";
    // gambar : string = "http://localhost/apcon/api/upload/";
    isLoading = false;
    constructor(
      private http : HttpClient,
      private ahttp: HTTP,
      private alertCtrl : AlertController,
      private toastCtrl : ToastController,
      private loadingCtrl: LoadingController
      ){}

    post(body: any, api: string) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        let url = this.server + api;
        return this.http.post(url, JSON.stringify(body), httpOptions).pipe((res)=>res);
    }

    get( api: string) {
      let url = this.server + api;
      return this.http.get(url).pipe((res)=>res);
    }

    apost(body: any, api: string) {
      const httpOptions = {
        headers: new HttpHeaders(
          { 
            'Content-Type': 'application/json',
            Authorization: 'OAuth2: token'
           })
      }
      let url = this.server + api;
      return this.ahttp.post(url, JSON.stringify(body), httpOptions);
  }


    async toastNotif(message:any) {
      const toast = await this.toastCtrl.create({
        message: message,
        cssClass: 'custom-toast',
        buttons: ['ok'],
      });
      await toast.present();
    }
  
    async alertNotif(message:any) {
      const toast = await this.alertCtrl.create({
        message: message,
        buttons: ['ok'],
      });
      await toast.present();
    }
  
    async showLoading() {
      this.isLoading = true;
      return await this.loadingCtrl.create({
        message:'Tunggu ya, data sedang dimuat'
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }

    async dismissLoading() {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
    async alertDismiss(){
      await this.alertCtrl.dismiss();
    }

    async toastDismiss(){
      await this.toastCtrl.dismiss();
    }
    
}