import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('./../../../build/contracts/MarketPlace.json');
let storeAbi = require('./../../../build/contracts/Store.json');

@Injectable()

export class EthcontractService {
  private web3Provider: null;
  private contracts: {};
  private accounts : any[];

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    }

    window.web3 = new Web3(this.web3Provider);
    this.accounts=window.web3.eth.accounts;
    console.log(this.accounts);
    console.log(window.web3.eth.accounts);
    // console.log(web3);

    // const web3 = new Web3(web3Provider);
const getAccount = async () => {
   const accounts = await window.web3.eth.accounts;
   console.log(accounts);
};
getAccount();
  }

  addStoreOwnerDetails(stOwneraddress) {
   console.log('Adding store owner');
   // let that = this;
     var stContract = TruffleContract(tokenAbi);
  stContract.setProvider(this.web3Provider);

   return new Promise((resolve, reject) => {
     stContract.deployed().then(function(instance) {
         return instance.createStoreOwner('0x674967e937e03ae769aeb84d0eb46c892345d045', { from : '0x674967e937e03ae769aeb84d0eb46c892345d045'}).then(function(status) {
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
// getAccountInfo() {
//    return new Promise((resolve, reject) => {
//      window.web3.eth.getCoinbase(function(err, account) {
//
//        if(err === null) {
//          web3.eth.getBalance(account, function(err, balance) {
//            if(err === null) {
//              return resolve({fromAccount: account, balance:web3.fromWei(balance, "ether")});
//            } else {
//              return reject("error!");
//            }
//          });
//        }
//      });
//    });
//  }
 // getAccountList() {
 //   return new Promise((resolve, reject) => {
 //     web3.eth.accounts(function(err, account) {
 //
 //       if(err === null) {
 //             return resolve(account);
 //           } else {
 //             return reject("error!");
 //           }
 //       });
 //   });
 // }
createAdminUser(addressUser){
  console.log('Create admin');
  // let that = this;
    var stContract = TruffleContract(tokenAbi);
 stContract.setProvider(this.web3Provider);

  return new Promise((resolve, reject) => {
    stContract.deployed().then(function(instance) {
        return instance.createAdminUser(addressUser, { from : '0x674967e937e03ae769aeb84d0eb46c892345d045'}).then(function(status) {
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
getStores() {
 console.log('Getting stores');
 // let that = this;
   var stContract = TruffleContract(tokenAbi);
stContract.setProvider(this.web3Provider);

 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.getStores().then(function(stores) {
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

 return new Promise((resolve, reject) => {
   stContract.deployed().then(function(instance) {
       return instance.createStoreFront(storename,description, { from : '0x674967e937e03ae769aeb84d0eb46c892345d045'}).then(function(status) {
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

}
