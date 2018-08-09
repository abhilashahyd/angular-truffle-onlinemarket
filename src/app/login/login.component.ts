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
    }
 signin(){
    console.log(this.activeAccount);
    console.log(this.adminFlag);
    this.ethcontractService.createAdminUser(this.activeAccount).then(function(status){
    //'674967e937e03ae769aeb84d0eb46c892345d045', { from :  '4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status){
   // that.storeOwner = stowner;
   console.log(status);
   // that.balance = acctInfo.balance;
 }).catch(function(error){
   console.log(error);
 });
    this.router.navigate(['/dashboard']);
 }
}
