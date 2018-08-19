import { Component, OnInit } from '@angular/core';
import {EthcontractService} from './../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
accessType: any;
isSuperAdmin: boolean;
isAdmin: boolean;
isStoreOwner: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) { }

  ngOnInit() {
    this.ethcontractService.checkAccess().then(accessType=>{
      this.accessType= accessType;
      console.log(this.accessType);
      this.isSuperAdmin=this.accessType[0];
      this.isAdmin=this.accessType[1];
      this.isStoreOwner=this.accessType[2];
    });

  }

}
