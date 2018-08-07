import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products: Product[];
  constructor(private route: ActivatedRoute, private router: Router, private commonService : CommonService){}

  ngOnInit() {
    this.commonService.getProducts().subscribe(products=>{
      this.products= products.products;
    });
  }

  addProduct(){
     this.router.navigate(['/dashboard/products/productdetails']);
  }
 show(rindex){
   this.router.navigate(['/dashboard/products/productdetails',{id:rindex}]);
 }
}
