import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores: Product[];
    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){}

    ngOnInit() {
      console.log('OnInit: ' + this.ethcontractService);
      console.log(this);
      this.ethcontractService.getStores().then(function(stores){
     this.stores = [stores];
     console.log(stores);
     // that.balance = acctInfo.balance;
   }).catch(function(error){
     console.log(error);
   });
    }
    addStore(){
       this.router.navigate(['/dashboard/stores/storedetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/stores/storedetails',{id:rindex}]);
   }
}
