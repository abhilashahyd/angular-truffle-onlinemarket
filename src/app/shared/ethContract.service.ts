import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import * as _ from 'lodash';

declare let require: any;
declare let window: any;

let tokenAbi = require('./../../../build/contracts/MarketPlace.json');
let storeAbi = require('./../../../build/contracts/Store.json');

@Injectable()

export class EthcontractService {
  private web3Provider: null;
  private contracts: {};
  private accounts : any[];
  private activeAccount:any;
  // private accessType : string;
  private accessTypes : any[] =[];

  constructor() {
    // if (typeof window.web3 !== 'undefined') {
    //   this.web3Provider = window.web3.currentProvider;
    // } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    // }

    window.web3 = new Web3(this.web3Provider);
    this.accounts=window.web3.eth.accounts;
    console.log(this.accounts);

  }

  checkValidAccount(account){
  const matchAct =  _.find(this.accounts,(acct) => acct == account);
  console.log(matchAct);
  this.activeAccount=account;
  if (matchAct ==undefined)
    return false;
  else
    return true;
  }

  checkAccess(){
    // if (this.accessType ==undefined){
      // let accessFlags = await myContract.checkAccess(accounts[0]);

      var stContract = TruffleContract(tokenAbi);
      stContract.setProvider(this.web3Provider);
    let act = this.activeAccount;
      console.log(this.activeAccount);
      return new Promise((resolve, reject) => {
    stContract.deployed().then(async function(instance) {
      console.log('in check access');

      console.log(act);
      var  access =await instance.checkAccess(act);
        // return access;
        console.log(access);
      // this.accessType= access;
      return resolve(access);
    });
  });
  // }

}

checkAllAccess(){
    var stContract = TruffleContract(tokenAbi);
    stContract.setProvider(this.web3Provider);
    var that=this;
   return new Promise((resolve, reject) => {
  stContract.deployed().then(function(instance) {
    that.accounts.forEach(async function(act){
      console.log(act);
       var accType =await instance.checkAccess(act);
      that.accessTypes.push({account: act, access: accType});
    });
    console.log(that.accessTypes);
     return resolve(that.accessTypes);
  });
});
}
// return this.accessType;
// }
  addStoreOwnerDetails(stOwneraddress) {
   console.log('Adding store owner');
   // let that = this;
     var stContract = TruffleContract(tokenAbi);
  stContract.setProvider(this.web3Provider);
 var activeAct= this.activeAccount;
   return new Promise((resolve, reject) => {
     stContract.deployed().then(function(instance) {
         return instance.createStoreOwner(stOwneraddress, { from : activeAct}).then(function(status) {
         if(status!= undefined) {
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
       if(status!= undefined) {
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

createAdminUser(addressUser){
  console.log('Create admin');
  // let that = this;
    var stContract = TruffleContract(tokenAbi);
 stContract.setProvider(this.web3Provider);
 var activeAct= this.activeAccount;

  return new Promise((resolve, reject) => {
    stContract.deployed().then(function(instance) {
        return instance.createAdminUser(addressUser, { from : activeAct}).then(function(status) {
          console.log("Inside createAdminUser1");
          console.log(status);
        if(status!= undefined) {
          console.log("Inside createAdminUser");
          console.log(status);
          return resolve({status:true});
        }
      }).catch(function(error){
        console.log(error);

        return reject("Error in createAdminUser service call");
      });
  });
 });

}
getStores(storeOwner) {
 console.log('Getting stores');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);
var activeAct;
if(storeOwner==undefined)
activeAct= this.activeAccount;
else
activeAct= storeOwner;
 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.getStores(activeAct).then(function(stores) {
       if(stores!= undefined) {
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
 console.log('Create store front');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);
var activeAct= this.activeAccount;
console.log(activeAct);
 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.createStoreFront(storename,description, { from : activeAct}).then(function(status) {
         console.log(status);
       if(status!= undefined) {
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

checkAdmingAccess(addressUser){
  console.log('Check admin');
  // let that = this;
    var stContract = TruffleContract(tokenAbi);
 stContract.setProvider(this.web3Provider);

  return new Promise((resolve, reject) => {
    stContract.deployed().then(function(instance) {
        return instance.checkAdmingAccess(addressUser).then(function(status) {
          console.log(status);
        if(status != undefined) {
          console.log("Inside checkAdmingAccess");
          console.log(status);
          return resolve(status);
        }
      }).catch(function(error){
        console.log(error);

        return reject("Error in createStoreOwner service call");
      });
  });
 });

}

// getProducts(store) {
//  console.log('Getting Products');
//  // let that = this;
//    var stContract = TruffleContract(tokenAbi);
// stContract.setProvider(this.web3Provider);
//  currentStore = Store.at(store);
//  return new Promise((resolve, reject) => {
//    stContract.deployed().then(function(instance) {
//        return currentStore.getProducts(false).then(function(products) {
//        if(products!= undefined) {
//          console.log("Inside");
//          console.log(products);
//          return resolve(products);
//        }
//      }).catch(function(error){
//        console.log(error);
//
//        return reject("Error in getProducts service call");
//      });
//  });
// });
// }

}
