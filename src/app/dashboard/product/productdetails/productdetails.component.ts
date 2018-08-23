import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../../shared/ethContract.service';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  stOwner: any;
  productid : number;
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
   this.stOwner={name:''};
  }

   ngOnInit() {
     this.route.params.subscribe((params: Params) => {
     let id = parseInt(params['id']);
     this.productid = id;
     console.log(id);
     });
   }
  onSave(){

  }

}
