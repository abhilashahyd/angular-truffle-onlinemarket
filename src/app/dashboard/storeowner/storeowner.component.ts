import { Component, OnInit } from '@angular/core';
import { StoreOwner } from '../../shared/storeowner.interface';
import { CommonService } from '../../shared/common.service';
// import {Web3Service} from '../../util/web3.service';
import {EthcontractService} from './../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
// declare let require: any;
// const marketplace_artifacts = require('../../../../build/contracts/MarketPlace.json');

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {
  storeOwner: any[];
  MarketPlace : any;

    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
        console.log('Constructor: ' + ethcontractService);
    }

    ngOnInit() {
      // this.commonService.getProducts().subscribe(products=>{
      //   this.products= products.products;
      // });
      console.log('OnInit: ' + this.ethcontractService);
      console.log(this);
      this.ethcontractService.getStoreOwners().then(function(stowner){
     this.storeOwner = [stowner];
     console.log(stowner);
     // that.balance = acctInfo.balance;
   }).catch(function(error){
     console.log(error);
   });

    }


    addStoreOwner(){
      // this.addStoreOwnerDetails('0x674967e937e03AE769Aeb84D0Eb46c892345d045');
       this.router.navigate(['/dashboard/storeowner/storeownerdetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}
