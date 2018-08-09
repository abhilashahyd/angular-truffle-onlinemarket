import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('./../../../build/contracts/MarketPlace.json');

@Injectable({
  providedIn: 'root'
})

export class EthcontractService {
  private web3Provider: null;
  private contracts: {};
  const stContract = TruffleContract(tokenAbi);

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
   this.stContract.setProvider(this.web3Provider);

   return new Promise((resolve, reject) => {
     this.stContract.deployed().then(function(instance) {
         return instance.createStoreOwner(stOwneraddress).then(function(status) {
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
 }
}

getStoreOwners() {
 console.log('Getting store owner');
 // let that = this;
 this.stContract.setProvider(this.web3Provider);

 return new Promise((resolve, reject) => {
   this.stContract.deployed().then(function(instance) {
       return instance.getStoreOwners().then(function(status) {
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
}
}
 //   try {
 //     const deployedStoreOwner = await this.MarketPlace.deployed();
 //     console.log(deployedStoreOwner);
 //     // console.log('Account', this.model.account);
 //     const StoreOwners = await deployedStoreOwner.createStoreOwner.call(stOwneraddress);
 //     console.log('Found store owners: ' + StoreOwners);
 //     this.storeOwner = StoreOwners;
 //   } catch (e) {
 //     console.log(e);
 //     // this.setStatus('Error getting balance; see log.');
 //   }
 // }

  // getAccountInfo() {
  //   return new Promise((resolve, reject) => {
  //     window.web3.eth.getCoinbase(function(err, account) {
  //
  //       if(err === null) {
  //         web3.eth.getBalance(account, function(err, balance) {
  //           if(err === null) {
  //             return resolve({fromAccount: account, balance:web3.fromWei(balance, "ether")});
  //           } else {
  //             return reject("error!");
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
  //
  // transferEther(
  //   _transferFrom,
  //   _transferTo,
  //   _amount,
  //   _remarks
  // ) {
  //   let that = this;
  //
  //   return new Promise((resolve, reject) => {
  //     let paymentContract = TruffleContract(tokenAbi);
  //     paymentContract.setProvider(that.web3Provider);
  //
  //     paymentContract.deployed().then(function(instance) {
  //         return instance.transferFund(
  //           _transferTo,
  //           {
  //             from:_transferFrom,
  //             value:web3.toWei(_amount, "ether")
  //           });
  //       }).then(function(status) {
  //         if(status) {
  //           return resolve({status:true});
  //         }
  //       }).catch(function(error){
  //         console.log(error);
  //
  //         return reject("Error in transferEther service call");
  //       });
  //   });
  // }
}
