import { Injectable } from '@angular/core';
import {SQLiteObject} from "@awesome-cordova-plugins/sqlite/ngx";
import {BehaviorSubject, Observable} from "rxjs";
import {Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@awesome-cordova-plugins/sqlite-porter/ngx";
import {Product} from "./data.service";
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  products = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'products_db.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // console.log(db);
        this.storage = db;
        this.populateDb();
      })
    })
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  populateDb() {
    this.httpClient.get(
      'assets/sample.sql',
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data).then(_ => {
        this.getProducts();
        this.isDbReady.next(true);
      })
        .catch(error => console.error(error))
    })
  }

  getProducts() {
    return this.storage.executeSql('SELECT * FROM product', []).then(res => {
      let items: Product[] = [];
      if(res.rows.length > 0) {
        for(var i=0;i<res.rows.length;i++) {
          items.push({
            _id: res.rows.item(i).id,
            name: res.rows.item(i).productName,
            quantity: res.rows.item(i).quantity,
            desiredQuantity: res.rows.item(i).desiredQuantity,
            measurement: res.rows.item(i).measurement,
            expirationDate: res.rows.item(i).expirationData,
            price: res.rows.item(i).price
          });
        }
      }
      this.products.next(items);
    })
  }

  getProduct(id): Promise<Product> {
    return this.storage.executeSql('SELECT * FROM product WHERE id = ?', [id])
      .then(res => {
        return {
          _id: res.rows.item(0).id,
          name: res.rows.item(0).productName,
          quantity: res.rows.item(0).quantity,
          desiredQuantity: res.rows.item(0).desiredQuantity,
          measurement: res.rows.item(0).measurement,
          expirationDate: res.rows.item(0).expirationData,
          price: res.rows.item(0).price
        }
      })
  }

  addProduct(name, quantity, desiredQuantity, measurement, expirationDate, price) {
    let data = [name, quantity, desiredQuantity, measurement, expirationDate, price];
    return this.storage.executeSql('INSERT INTO product (productName, quantity, desiredQuantity, measurement, expirationData, price) VALUES (?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getProducts();
      })
  }

  updateProduct(id, product: Product) {
    let data = [product.name, product.quantity, product.desiredQuantity, product.measurement, product.expirationDate, product.price];
    return this.storage.executeSql(`UPDATE product SET productName = ?, quantity = ?, desiredQuantity = ?, measurement = ?, expirationData = ?, price = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getProducts();
      })
  }

  deleteProduct(id) {
    return this.storage.executeSql('DELETE FROM product WHERE id = ?', [id])
      .then(_ => {
        this.getProducts();
    })
  }
}
