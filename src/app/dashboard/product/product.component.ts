import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products: Product[];
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.products= [{
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

  addProduct(){
     this.router.navigate(['/dashboard/products/productdetails']);
  }
 show(rindex){
   this.router.navigate(['/dashboard/products/productdetails',{id:rindex}]);
 }
}
