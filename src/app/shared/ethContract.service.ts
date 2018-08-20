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
  private myContract: any;
  private Store : any;

  constructor() {
    // if (typeof window.web3 !== 'undefined') {
    //   this.web3Provider = window.web3.currentProvider;
    // } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    // }

    window.web3 = new Web3(this.web3Provider);
    this.accounts=window.web3.eth.accounts;
    console.log(this.accounts);
    let   MarketPlace  = TruffleContract(tokenAbi);
    let that=this;
    MarketPlace.setProvider(this.web3Provider);
    MarketPlace.deployed().then(function(instance) {
    that.myContract = instance;
  });

    this.Store  = TruffleContract(storeAbi);
  //   let that=this;
  //   Store.setProvider(this.web3Provider);
  //   Store.deployed().then(function(instance) {
  //   that.myContract = instance;
  //
  // });
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

  async checkAccess(){
  const  accessFlags = await this.myContract.checkAccess(this.activeAccount);
  return accessFlags;
}

  async addStoreOwnerDetails(stOwneraddress) {
   console.log('Adding store owner');
  let storeOwners = await this.myContract.createStoreOwner(stOwneraddress, { from : this.activeAccount});
  return storeOwners;

}

async getAdminUsers() {
 console.log('Getting adminUsers');
 let adminUsers = await this.myContract.getAdminUsers();
 return adminUsers;
}

async getStoreOwners() {
 console.log('Getting store owner');
let storeOwners = await this.myContract.getStoreOwners();
return storeOwners;
}

async createAdminUser(addressUser){
  console.log('Create admin');
  let storeOwners = await this.myContract.createAdminUser(addressUser, { from : this.activeAccount});
  return storeOwners;
}

async getStores(storeOwner) {
 console.log('Getting stores');

 let storeOwners = await this.myContract.getStores(this.activeAccount);
 return storeOwners;

}

async createStoreFront(storename,description){
  console.log('Create new store front');
 let storeCreated = await this.myContract.createStoreFront(storename, description, {from:this.activeAccount});
      return storeCreated;
   }

async checkAdmingAccess(addressUser){
  console.log('Check admin');
  let chkAdmin = await this.myContract.checkAdmingAccess(addressUser);
       return chkAdmin;
}


async getStoreDetails(store) {
 console.log('Getting store details');
 const currentStore = this.Store.at(store);
 let storedetails = await currentStore.getStoreDetails();
 return storedetails;
}

async addProductToTheStore(store, productName,description,price, quantity){
  console.log('Adding product to store');
  const currentStore = this.Store.at(store);
  let productdetails = await currentStore.addProductToTheStore( productName,description,price, quantity,{from:this.activeAccount});
  return productdetails;
}

async getProductsInStore(store) {
 console.log('Getting products in store');
 const currentStore = this.Store.at(store);
 let productDetails : any[];
 let productIds = await currentStore.getProducts(false);
 productIds.forEach(async function(currentProductId){
   console.log(currentProductId);
    var productdetail =await this.currentStore.getProductDetails(currentProductId);
   productDetails.push({productId: currentProductId, productdetail: productdetail});
 });
 console.log(productDetails);
   return productDetails;
}


async getStoreBalance(store) {
 console.log('Getting store balance');
 const currentStore = this.Store.at(store);
 let storeBalance = await currentStore.getBalanceOfStore();
 return storeBalance;
}

}
