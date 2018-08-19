import { Component, OnInit,Inject } from '@angular/core';
import {EthcontractService} from '../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddadminComponent} from './addadmin/addadmin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
admins : any[];
account : any;
constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService, public dialog: MatDialog) { }

  ngOnInit() {
    this.ethcontractService.getAdminUsers().then(admins=>{
      console.log(admins);
      this.admins= admins;
    });
  }

  // setAdmin(account,index){
  //   this.ethcontractService.createAdminUser(account).then(status=>{
  //     console.log(status);
  //     this.accessAccounts[index].access[1]=true;
  //     // this.accessAccounts= access;
  //   });


  // }


  openDialog(): void {
      const dialogRef = this.dialog.open(AddadminComponent, {
        width: '250px',
        data: { account: this.account}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.account = result;
        this.ethcontractService.createAdminUser(result).then(status=>{
          console.log(status);
          this.admins.push(result);
          // this.accessAccounts[index].access[1]=true;
          // this.accessAccounts= access;
        });

      });
    }

}
