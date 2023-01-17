import { Injectable } from '@angular/core';
import {DataService, Product} from "./data.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection: any;
  productRefList: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(public dataService: DataService,
              public db: AngularFireDatabase) {
  }

  // public getProduct(id: string) {
  //   this.productRef = this.db.object('/product/' + id);
  //   return this.productRef;
  // }
  //
  // public getProductsList() {
  //   this.productRefList = this.db.list('/product')
  //   return this.productRefList;
  // }
  //
  // public addProduct(name: string, quantity: string, desiredQuantity: string, measurement: string, expirationDate: string, price: string) {
  //   // let newProduct: Product = {
  //   //   name: name,
  //   //   quantity: parseInt(quantity, 10),
  //   //   desiredQuantity: parseInt(desiredQuantity, 10),
  //   //   measurement: measurement,
  //   //   expirationDate: expirationDate,
  //   //   price: parseInt(price, 10)
  //   // }
  //   this.productRefList.push({
  //     name: name,
  //     quantity: parseInt(quantity, 10),
  //     desiredQuantity: parseInt(desiredQuantity, 10),
  //     measurement: measurement,
  //     expirationDate: expirationDate,
  //     price: parseFloat(price)
  //   });
  //   // this.dataService.addProduct(newProduct);
  // }
  //
  // public deleteProduct(id: string) {
  //   // this.dataService.deleteProduct(parseInt(id, 10));
  //   this.productRef = this.db.object('/product/' + id);
  //   this.productRef.remove();
  // }
  //
  // public updateProduct(id: string, name: string, quantity: string, desiredQuantity: string, measurement: string, expirationDate: string, price: string) {
  //   // let oldProduct = this.dataService.getProductById(parseInt(id, 10))
  //   // let newProduct: Product = {
  //   //   id: oldProduct.id,
  //   //   name: name,
  //   //   quantity: parseInt(quantity, 10),
  //   //   desiredQuantity: parseInt(desiredQuantity, 10),
  //   //   measurement: oldProduct.measurement,
  //   //   expirationDate: expirationDate,
  //   //   price: parseInt(price, 10)
  //   // }
  //   // this.dataService.updateProduct(newProduct);
  //   this.productRef = this.db.object('/product/' + id);
  //   this.productRef.update({
  //     name: name,
  //     quantity: parseInt(quantity, 10),
  //     desiredQuantity: parseInt(desiredQuantity, 10),
  //     measurement: measurement,
  //     expirationDate: expirationDate,
  //     price: parseFloat(price)
  //   })
  // }
}
