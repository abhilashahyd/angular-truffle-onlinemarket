import { Component, OnInit } from '@angular/core';

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
