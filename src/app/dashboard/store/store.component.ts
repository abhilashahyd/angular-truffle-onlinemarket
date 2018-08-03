import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores: Product[];
    constructor(private route: ActivatedRoute, private router: Router){}

    ngOnInit() {
      this.stores= [{
            "uniqueId":"10101",
            "productName": "Samsung",
            "description": " enhanced featured mobile",
            "dateOfManufacture": "03-04-2018",
            "dateOfExpiry": "03-04-2018",
            "price" : 100,
            "inventory": 100
          },
        {
            "uniqueId":"10101",
            "productName": "Nokia",
            "description": "connecting everywhere",
            "dateOfManufacture": "03-04-2018",
            "dateOfExpiry": "03-04-2018",
            "price" : 100,
            "inventory": 100
        },
        {
            "uniqueId":"10101",
            "productName": "Micromax",
            "description": "nothing like anything",
            "dateOfManufacture": "03-04-2018",
            "dateOfExpiry": "03-04-2018",
            "price" : 100,
            "inventory": 100
        },{
              "uniqueId":"10101",
              "productName": "Samsung",
              "description": " enhanced featured mobile",
              "dateOfManufacture": "03-04-2018",
              "dateOfExpiry": "03-04-2018",
              "price" : 100,
              "inventory": 100
            },
          {
              "uniqueId":"10101",
              "productName": "Nokia",
              "description": "connecting everywhere",
              "dateOfManufacture": "03-04-2018",
              "dateOfExpiry": "03-04-2018",
              "price" : 100,
              "inventory": 100
          },
          {
              "uniqueId":"10101",
              "productName": "Micromax",
              "description": "nothing like anything",
              "dateOfManufacture": "03-04-2018",
              "dateOfExpiry": "03-04-2018",
              "price" : 100,
              "inventory": 100
          },{
                "uniqueId":"10101",
                "productName": "Samsung",
                "description": " enhanced featured mobile",
                "dateOfManufacture": "03-04-2018",
                "dateOfExpiry": "03-04-2018",
                "price" : 100,
                "inventory": 100
              },
            {
                "uniqueId":"10101",
                "productName": "Nokia",
                "description": "connecting everywhere",
                "dateOfManufacture": "03-04-2018",
                "dateOfExpiry": "03-04-2018",
                "price" : 100,
                "inventory": 100
            },
            {
                "uniqueId":"10101",
                "productName": "Micromax",
                "description": "nothing like anything",
                "dateOfManufacture": "03-04-2018",
                "dateOfExpiry": "03-04-2018",
                "price" : 100,
                "inventory": 100
            }];
    }
    addStore(){
       this.router.navigate(['/dashboard/stores/storedetails']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/stores/storedetails',{id:rindex}]);
   }
}
