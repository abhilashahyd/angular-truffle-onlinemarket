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
accessType : string;

  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) { }

  ngOnInit() {
    this.adminFlag=false;
    }

 signin(){
    console.log(this.activeAccount);
    var status = this.ethcontractService.checkValidAccount(this.activeAccount);
    if(!status){
        alert('Not a valid account');
        this.activeAccount='';
        return;
      }
      this.router.navigate(['/dashboard']);
 // });
}
}
