import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
 @Input() storeOwner : any;
 @Input() isOwner : boolean;

  stores: any[];
    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
      this.isOwner =false;
    }

    ngOnInit() {
      if(this.storeOwner){
        this.isOwner=true;
      }
      this.ethcontractService.getStores(this.storeOwner).then((stores)=>{
     this.stores = [stores];
     console.log(stores);
     // that.balance = acctInfo.balance;
   }).catch((error)=>{
     console.log(error);
   });
    }
    addStore(){
       this.router.navigate(['/dashboard/stores/addstore']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/stores/storedetails',{id:rindex}]);
   }
}
