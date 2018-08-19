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
  storeOwners: any[];
  MarketPlace : any;

    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
        // console.log('Constructor: ' + ethcontractService);
    }

    ngOnInit() {
      this.ethcontractService.getStoreOwners().then(stOwner=>{
        console.log(stOwner);
        this.storeOwners = stOwner;
      });
      }


    addStoreOwner(){
      // this.addStoreOwnerDetails('0x674967e937e03AE769Aeb84D0Eb46c892345d045');
       this.router.navigate(['/dashboard/storeowner/addstoreowner']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}
