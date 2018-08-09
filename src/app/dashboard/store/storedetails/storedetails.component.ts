import { Component, OnInit } from '@angular/core';
import {EthcontractService} from './../../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-storedetails',
  templateUrl: './storedetails.component.html',
  styleUrls: ['./storedetails.component.css']
})
export class StoredetailsComponent implements OnInit {
  store: any;
  staddress='';
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) {
   this.store={name:'', description:''};
  }

   ngOnInit() {
   }
  onSave(){
    this.ethcontractService.createStoreFront(this.store.name, this.store.description).then(function(status){
    //'674967e937e03ae769aeb84d0eb46c892345d045', { from :  '4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status){
   // that.storeOwner = stowner;
   console.log(status);
   // that.balance = acctInfo.balance;
 }).catch(function(error){
   console.log(error);
 });
 this.router.navigate(['/dashboard/store']);
  }
Reset(){
  this.store={name:'', description:''};
}
}
