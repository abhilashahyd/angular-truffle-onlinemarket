import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {
  stOwner: any;
   constructor() {
   this.stOwner={name:''};
  }

   ngOnInit() {
   }
  onSave(){

  }

}
