import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('./../../../build/contracts/MarketPlace.json');

@Injectable()

export class EthcontractService {
  private web3Provider: null;
  private contracts: {};


  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }

    window.web3 = new Web3(this.web3Provider);
  }

  addStoreOwnerDetails(stOwneraddress) {
   console.log('Adding store owner');
   // let that = this;
     var stContract = TruffleContract(tokenAbi);
  stContract.setProvider(this.web3Provider);

   return new Promise((resolve, reject) => {
     stContract.deployed().then(function(instance) {
         return instance.createStoreOwner('0x674967e937e03ae769aeb84d0eb46c892345d045', { from : '0x4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status) {
         if(status) {
           console.log("Inside");
           console.log(status);
           return resolve({status:true});
         }
       }).catch(function(error){
         console.log(error);

         return reject("Error in createStoreOwner service call");
       });
   });
 });
}

getStoreOwners() {
 console.log('Getting store owner');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);

 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
     console.log(instance);
       return instance.getStoreOwners().then(function(storeowners) {
       if(status) {
         console.log("Inside");
         console.log(storeowners);
         return resolve(storeowners);
       }
     }).catch(function(error){
       console.log(error);

       return reject("Error in createStoreOwner service call");
     });
 });
});
}

getStores() {
 console.log('Getting stores');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);

 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.getStores().then(function(stores) {
       if(status) {
         console.log("Inside");
         console.log(stores);
         return resolve(stores);
       }
     }).catch(function(error){
       console.log(error);

       return reject("Error in createStoreOwner service call");
     });
 });
});
}
createStoreFront(storename,description) {
 console.log('Adding store owner');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);

 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.createStoreFront(storename,description, { from : '0x4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status) {
       if(status) {
         console.log("Inside");
         console.log(status);
         return resolve({status:true});
       }
     }).catch(function(error){
       console.log(error);

       return reject("Error in createStoreOwner service call");
     });
 });
});
}

}
