import { Component } from '@angular/core';

import { DataService, Product } from '../services/data.service';

import {DbService} from "../services/db.service";
import {ApiService} from "../services/api.service";
import {NetworkService} from "../services/network.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Product[] = [];

  constructor(public db: DbService,
              public api: ApiService,
              public networkService: NetworkService) { }

  ngOnInit() {
    // this.api.getAllProducts();
    this.networkService.getNetworkStatus().then((status) => {
      console.log("Network status is: " + JSON.stringify(status));
    })
    this.api.data$.subscribe(item => {
      this.products = item;
      console.log("Products: " + item)
    });
    console.log("Products: " + this.products)
    // this.db.dbState().subscribe((res) => {
    //   if(res){
    //     this.db.fetchProducts().subscribe(item => {
    //       this.products = item;
    //     })
    //   }
    // })
  }

  getProducts() {
    return this.products;
  }

}
