import { Component, OnInit } from '@angular/core';
// import {Web3Service} from './../../util/web3.service';

@Component({
  selector: 'app-storeownerdetails',
  templateUrl: './storeownerdetails.component.html',
  styleUrls: ['./storeownerdetails.component.css']
})
export class StoreownerdetailsComponent implements OnInit {

  stOwner: any;
   constructor() {
   this.stOwner={name:''};
  }

   ngOnInit() {
   }
  onSave(){

  }

}
