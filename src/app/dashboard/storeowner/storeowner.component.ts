import { Component, OnInit } from '@angular/core';
import { StoreOwner } from '../../shared/storeowner.interface';
import { CommonService } from '../../shared/common.service';
// import {Web3Service} from '../../util/web3.service';
import {EthcontractService} from './../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let require: any;
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
      var that=this;
      this.ethcontractService.getStoreOwners().then(function(stowner){
     that.storeOwner = stowner;
     console.log(stowner);
     // that.balance = acctInfo.balance;
   }).catch(function(error){
     console.log(error);
   });
      // this.web3Service.artifactsToContract(marketplace_artifacts)
      //   .then((MktPlaceAbstraction) => {
      //     this.MarketPlace = MktPlaceAbstraction;
      //     this.getDetails();
      //   });
    }

    // watchAccount() {
    //   this.web3Service.accountsObservable.subscribe((accounts) => {
    //     this.accounts = accounts;
    //     console.log(this.accounts);
    //     // this.model.account = accounts[0];
    //     this.getDetails();
    //   });
    // }

    // async getStoreOwners() {
    //   console.log('Getting stores');

      // try {
      //   const deployedStoreOwner = await this.MarketPlace.deployed();
      //   console.log(deployedStoreOwner);
      //   // console.log('Account', this.model.account);
      //   const StoreOwners = await deployedStoreOwner.getStoreOwners.call();
      //   console.log('Found store owners: ' + StoreOwners);
      //   this.storeOwner = StoreOwners;
      // } catch (e) {
      //   console.log(e);
      //   // this.setStatus('Error getting balance; see log.');
      // }
    // }

    async addStoreOwnerDetails(stOwneraddress) {
      console.log('Getting stores');
      // const vstOwneraddress='674967e937e03ae769aeb84d0eb46c892345d045';
      // const fromAddress
      this.ethcontractService.addStoreOwnerDetails('674967e937e03ae769aeb84d0eb46c892345d045', { from :  '4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status){
     // that.storeOwner = stowner;
     console.log(status);
     // that.balance = acctInfo.balance;
   }).catch(function(error){
     console.log(error);
   });
      // try {
      //   const deployedStoreOwner = await this.MarketPlace.deployed();
      //   console.log(deployedStoreOwner);
      //   // console.log('Account', this.model.account);
      //   const StoreOwners = await deployedStoreOwner.createStoreOwner.call(stOwneraddress);
      //   console.log('Found store owners: ' + StoreOwners);
      //   this.storeOwner = StoreOwners;
      // } catch (e) {
      //   console.log(e);
      //   // this.setStatus('Error getting balance; see log.');
      // }
    }

    addStoreOwner(){
      this.addStoreOwnerDetails('0x674967e937e03AE769Aeb84D0Eb46c892345d045');
       this.router.navigate(['/dashboard/storeowner/storeownerdetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}
