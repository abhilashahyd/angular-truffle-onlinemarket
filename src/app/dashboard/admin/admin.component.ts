import { Component, OnInit } from '@angular/core';
import {EthcontractService} from '../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
accessAccounts : any[];
constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) { }

  ngOnInit() {
    this.ethcontractService.checkAllAccess().then(access=>{
      console.log(access);
      this.accessAccounts= access;
    });
  }

  setAdmin(account,index){
    this.ethcontractService.createAdminUser(account).then(status=>{
      console.log(status);
      this.accessAccounts[index].access[1]=true;
      // this.accessAccounts= access;
    });


  }

}
