import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { restApi } from 'src/provider/restApi';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cari',
  templateUrl: './cari.page.html',
  styleUrls: ['./cari.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CariPage implements OnInit {
  keyword:any;
  produk:any=[];
  constructor(
    private api:restApi,
    private route:ActivatedRoute,
    private router:Router
    ) {
    this.route.queryParams.subscribe((params: any) => {
      this.keyword = params.q;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.hasilcari();
  }

  hasilcari(){
    this.api.get('products/search?q='+this.keyword).subscribe((res:any)=>{
      console.log(res);
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

  goBack(){
    this.router.navigateByUrl('produk',{replaceUrl:true});
  }

}
