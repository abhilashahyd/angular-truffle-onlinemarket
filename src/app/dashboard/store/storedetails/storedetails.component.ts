import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storedetails',
  templateUrl: './storedetails.component.html',
  styleUrls: ['./storedetails.component.css']
})
export class StoredetailsComponent implements OnInit {
  stOwner: any;
   constructor() {
   this.stOwner={name:''};
  }

   ngOnInit() {
   }
  onSave(){

  }

}
