import { Component, OnInit } from '@angular/core';
import { StoreOwner } from '../../shared/storeowner.interface';
import { CommonService } from '../../shared/common.service';
import {Web3Service} from '../../util/web3.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let require: any;
const marketplace_artifacts = require('../../../../build/contracts/MarketPlace.json');

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {
  storeOwner: StoreOwner[];
  MarketPlace : any;

    constructor(private route: ActivatedRoute, private router: Router, private web3Service: Web3Service){
        console.log('Constructor: ' + web3Service);
    }

    ngOnInit() {
      // this.commonService.getProducts().subscribe(products=>{
      //   this.products= products.products;
      // });
      console.log('OnInit: ' + this.web3Service);
      console.log(this);
      this.watchAccount();
      this.web3Service.artifactsToContract(marketplace_artifacts)
        .then((MktPlaceAbstraction) => {
          this.MarketPlace = MktPlaceAbstraction;
        });
    }

    watchAccount() {
      this.web3Service.accountsObservable.subscribe((accounts) => {
        this.accounts = accounts;
        console.log(this.accounts);
        this.model.account = accounts[0];
        this.refreshBalance();
      });
    }

    async refreshBalance() {
      console.log('Getting stores');

      try {
        const deployedStoreOwner = await this.MarketPlace.deployed();
        console.log(deployedStoreOwner);
        console.log('Account', this.model.account);
        const StoreOwners = await deployedStoreOwner.getStoreOwners.call();
        console.log('Found store owners: ' + StoreOwners);
        this.storeOwner = StoreOwners;
      } catch (e) {
        console.log(e);
        this.setStatus('Error getting balance; see log.');
      }
    }

    addStoreOwner(){
       this.router.navigate(['/dashboard/storeowner/storeownerdetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}
