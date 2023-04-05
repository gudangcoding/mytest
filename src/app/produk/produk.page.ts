import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { restApi } from 'src/provider/restApi';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProdukPage implements OnInit {
  produk:any=[];
  gambar:any=[];
  q:any;
  constructor(private api:restApi, private router:Router) { }

  ngOnInit() {

  }

  start: number = 0;
  perpage: number = 5;
  loading: any;
  keyword : any = "";

  ionViewWillEnter(){
    this.tampil();
  }
  tampil(){
    this.api.get('products').subscribe((res:any)=>{
      console.log(res.products);
      for(let item of res.products){
        this.produk.push(item);
      }
    })
  }

  detail(id:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      }
    };
    this.router.navigate(['detail'], navigationExtras);
  }

  cari(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        q: this.keyword,
      }
    };
    this.router.navigate(['cari'], navigationExtras);
  }



  getItems(ev:any) {
    var val = ev.target.value;
    if(val!="") this.loading = true;
    if (val) {
      this.q = val;
      this.start = 0;
      this.tampil();
    }
  }



}
