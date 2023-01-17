import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

export class Product {
  name: string;
  quantity: number;
  desiredQuantity: number;
  measurement: string;
  expirationDate: string;
  price: number;
  _id?: number;

  // constructor(data: any) {
  //   Object.assign(this, data);
  // }

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.desiredQuantity = data.desiredQuantity;
    this.measurement = data.measurement;
    this.expirationDate = data.expirationDate;
    this.price = data.price;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public products: Product[] = [];
  //   {
  //     id: 0,
  //     name: 'Flour',
  //     quantity: 100,
  //     desiredQuantity: 200,
  //     measurement: 'g',
  //     expirdationDate: '10/07/2020',
  //     price: 2
  //   },
  //   {
  //     id: 1,
  //     name: 'Eggs',
  //     quantity: 10,
  //     desiredQuantity: 4,
  //     measurement: 'pcs',
  //     expirdationDate: '15/07/2020',
  //     price: 0.5
  //   },
  //   {
  //     id: 2,
  //     name: 'Sugar',
  //     quantity: 300,
  //     desiredQuantity: 200,
  //     measurement: 'g',
  //     expirdationDate: '10/07/2021',
  //     price: 0.1
  //   },
  //   {
  //     id: 3,
  //     name: 'Yogurt',
  //     quantity: 3,
  //     desiredQuantity: 2,
  //     measurement: 'pcs',
  //     expirdationDate: '16/07/2020',
  //     price: 1
  //   },
  //   {
  //     id: 4,
  //     name: 'Ketchup',
  //     quantity: 1,
  //     desiredQuantity: 1,
  //     measurement: 'pcs',
  //     expirdationDate: '10/09/2020',
  //     price: 5
  //   },
  //   {
  //     id: 4,
  //     name: 'Ketchup',
  //     quantity: 1,
  //     desiredQuantity: 1,
  //     measurement: 'pcs',
  //     expirdationDate: '10/09/2020',
  //     price: 5
  //   },
  //   {
  //     id: 4,
  //     name: 'Ketchup',
  //     quantity: 1,
  //     desiredQuantity: 1,
  //     measurement: 'pcs',
  //     expirdationDate: '10/09/2020',
  //     price: 5
  //   },
  //   {
  //     id: 4,
  //     name: 'Ketchup',
  //     quantity: 1,
  //     desiredQuantity: 1,
  //     measurement: 'pcs',
  //     expirdationDate: '10/09/2020',
  //     price: 5
  //   },
  //   {
  //     id: 4,
  //     name: 'Ketchup',
  //     quantity: 1,
  //     desiredQuantity: 1,
  //     measurement: 'pcs',
  //     expirdationDate: '10/09/2020',
  //     price: 5
  //   },
  // ];
  private nextId: number = 0;

  constructor(
    private db: AngularFirestore
  ) {
    // this.fireStore.collection('product').snapshotChanges().subscribe(data => {
    //   console.log(data);
    // })
    // let product1: Product = {
    //   id: this.getNextId(),
    //   name: 'Flour',
    //   quantity: 100,
    //   desiredQuantity: 200,
    //   measurement: 'g',
    //   expirdationDate: '10/07/2020',
    //   price: 2
    // }
    // this.addProduct(product1);
    //
    // let product2: Product = {
    //   id: this.getNextId(),
    //   name: 'Eggs',
    //   quantity: 10,
    //   desiredQuantity: 4,
    //   measurement: 'pcs',
    //   expirdationDate: '15/07/2020',
    //   price: 0.5
    // }
    // this.addProduct(product2)
    //
    // let product3: Product = {
    //   id: this.getNextId(),
    //   name: 'Sugar',
    //   quantity: 300,
    //   desiredQuantity: 200,
    //   measurement: 'g',
    //   expirdationDate: '10/07/2021',
    //   price: 0.1
    // }
    // this.addProduct(product3)
    //
    // let product4: Product = {
    //   id: this.getNextId(),
    //   name: 'Yogurt',
    //   quantity: 3,
    //   desiredQuantity: 2,
    //   measurement: 'pcs',
    //   expirdationDate: '16/07/2020',
    //   price: 1
    // }
    // this.addProduct(product4)
    //
    // let product5: Product = {
    //   id: this.getNextId(),
    //   name: 'Watermelon',
    //   quantity: 1,
    //   desiredQuantity: 1,
    //   measurement: 'pcs',
    //   expirdationDate: '16/07/2020',
    //   price: 5
    // }
    // this.addProduct(product5)
}

  getAllProducts() : Observable<any> {
    return this.db.collection<any>('product').valueChanges();
  }

  public getProducts(): Product[] {
    // this.fireStore.collection('product').snapshotChanges().subscribe(data => {
    //   console.log(data);
    // })
    return this.products
  }

  public getProductById(id: number): Product {
    let product = this.products.find(elem => elem._id == id)
    if (product)
      return product
    else
      return null
  }

  public getNextId(): number {
    return this.nextId;
  }

  public getPostitionById(id: number) : number{
    for(let i=0; i<this.products.length; i++){
      if(this.products[i]._id == id)
        return i;
    }
    return -1;
  }

  public addProduct(product: Product) {
    this.products.push(product);
    this.nextId++;
  }

  public deleteProduct(id: number) {
    let posToDelete = this.getPostitionById(id);
    this.products.splice(posToDelete, 1)
  }

  public updateProduct(product: Product) {
    let posToUpdate = this.getPostitionById(product._id)
    this.products[posToUpdate] = product;
  }
}
