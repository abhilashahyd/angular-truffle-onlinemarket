import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { CommonService } from '../../shared/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {
  products: Product[];
    constructor(private route: ActivatedRoute, private router: Router, private commonService : CommonService){}

    ngOnInit() {
      this.commonService.getProducts().subscribe(products=>{
        this.products= products.products;
      });
    }

    addProduct(){
       this.router.navigate(['/dashboard/storeowner/storeownerdetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}
