import { Component, OnInit } from '@angular/core';
import {EthcontractService} from './../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
adminFlag :boolean;
activeAccount : string;

  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) { }

  ngOnInit() {
    this.adminFlag=false;
    console.log('OnInit: ' + this.ethcontractService);
    console.log(this);
    var that=this;
    this.ethcontractService.getStoreOwners().then(function(stowner){
   // that.storeOwner = [stowner];
   console.log(stowner);
   // that.balance = acctInfo.balance;
 }).catch(function(error){
   console.log(error);
 });
    }
 signin(){
    console.log(this.activeAccount);
    console.log(this.adminFlag);
    this.router.navigate(['/dashboard']);
 }
}
