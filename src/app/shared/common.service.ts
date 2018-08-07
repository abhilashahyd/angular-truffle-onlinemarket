import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Product} from './product.interface';
import {Store} from './store.interface';
import {StoreOwner} from './storeOwner.interface';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as contract from 'truffle-contract';
import {Subject} from 'rxjs/Rx';
declare let require: any;
const Web3 = require('web3');
declare let window: any;


const store_artifacts = require('./../../../build/contracts/Store.json');

@Injectable()
export class CommonService {
  private web3: any;
  // private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // private _store: BehaviorSubject<Store[]> = new BehaviorSubject<Store[]>([]);
  // private _storeOwner: BehaviorSubject<StoreOwner[]> = new BehaviorSubject<StoreOwner[]>([]);
  // private _cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private products:Product[];
  private accounts: string[];
  public ready = false;
  // public MetaCoin: any;
  public accountsObservable = new Subject<string[]>();
  constructor(private http: HttpClient) {
  //  }
  // constructor() {

    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');
       console.log(this.accounts);
       console.log(accs);
        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }

    getProducts(): Observable<any> {
      return this.http.get('assets/json/products.json')
            .map(products=>{
              console.log(products);
              return products;
              // this.products=products.products;
              //   return this.products || [];
            });
    }
    // private extractData(res: Response) {
    //   this.products = res;
    //   return this.products || [];
    // }


  addProduct(product: Product): void {
    // this. _products.next(this._products.getValue().concat(product));
    this.products.push(product);
  }

  // getProducts(): BehaviorSubject<Product[]> {
  //   return this.products;
  // }
}
