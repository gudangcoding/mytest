import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { restApi } from 'src/provider/restApi';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {
  id: any;
  produk:any="";
  constructor(
    private route: ActivatedRoute,
    private api:restApi,
    private router:Router,
    private nav:NavController) {
    this.route.queryParams.subscribe((params: any) => {
      //console.log(params);
      this.id = params.id;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.tampilDetail();
  }

  tampilDetail(){
    this.id =
    this.api.get('products/'+this.id).subscribe((res:any)=>{
      console.log(res);
      this.produk = res;
    })
  }

  goBack(){
    this.router.navigateByUrl('produk',{replaceUrl:true});
  }

}
