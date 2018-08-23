import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products: any[];
accessType : any;
@Input() store : any;
  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){}

  ngOnInit() {

    this.ethcontractService.checkAccess().then(accessType=>{
      this.accessType= accessType[2];
      console.log(this.accessType);
      });


    this.ethcontractService.getProductsInStore(this.store).then((products)=>{
   this.products = products;
   console.log(products);
   // that.balance = acctInfo.balance;
 }).catch((error)=>{
   console.log(error);
 });



  }

  addProduct(){
     this.router.navigate(['/dashboard/products/addproduct',{store:this.store}]);
  }
 show(rindex){
   if(this.accessType){
   this.router.navigate(['/dashboard/products/productdetails',{id:rindex}]);
 }
 }

 buyItem(){
  console.log('Buying');
 }
}
