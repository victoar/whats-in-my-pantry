import {Injectable} from '@angular/core';
import {Product} from "./data.service";
import {io} from "socket.io-client";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private socket;
  private products: Product[];
  private dataSubject = new Subject<Product[]>();
  data$ = this.dataSubject.asObservable();
  base_path = 'http://192.168.56.1:8080/api/products'
  // private productSubject = new Subject<string>();
  // public product$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getProductList();
    // this.socket$ = new WebSocketSubject('ws://192.168.56.1:8080/');
    // this.socket$.subscribe(
    //   msg => console.log('message received: ' + msg),
    //   // Called whenever there is a message from the server
    //   err => console.log(err),
    //   // Called if WebSocket API signals some kind of error
    //   () => console.log('complete')
    //   // Called when connection is closed (for whatever reason)
    // );
    // this.socket = io('http://192.168.56.1:8080/')
    // this.socket.on('connect', () => {
    //   console.log('Connected to server');
    // });
    //
    // this.socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  // createProduct(product: Product) {
  //   this.socket.emit('create', {data: product});
  // }

  // getAllProducts() {
  //   this.socket.emit('readAll');
  //   let productsList : Product[];
  //   this.socket.on('data', (products) => {
  //     productsList = products.map((item) => new Product(item));
  //     console.log("products: " + JSON.stringify(productsList));
  //     this.dataSubject.next(productsList);
  //   });
  // }

  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
  //
  // createProduct(item: Product): Observable<Product> {
  //   return this.http
  //     .post<Product>(this.base_path, JSON.stringify(item), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }
  //
  // getProduct(id): Observable<Product> {
  //   return this.http
  //     .get<Product>(this.base_path + '/' + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }
  //
  getProductList() {
    this.http.get(this.base_path).subscribe(data => {
      console.log('Data has been retrieved successfully!');
      this.products = data['data'];
      this.dataSubject.next(this.products);
    }, error => {
      console.log('There has been an error while retrieving data from server!');
    })
  }

  createProduct(product: Product) {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    this.http.post<Product>(this.base_path, {data: product}, {headers: headers}).subscribe(data => {
      console.log('Product has been created successfully!');
      this.products.push(data['data']);
      this.dataSubject.next(this.products);
    }, error => {
      console.log('There has been an error while creating a product from server!');
    })
  }

  getProductById(id: String) {
    return this.http.get(this.base_path + '/' + id);
  }

  updateProduct(id: String, product: Product) {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    this.http.put<Product>(this.base_path + "/update", {id: id, data: product}, {headers: headers}).subscribe(data => {
      console.log('Product has been updated successfully!');
      const index = this.products.findIndex(obj => obj._id.toString() === id);
      this.products[index] = data['data'];
      this.dataSubject.next(this.products);
    }, error => {
      console.log('There has been an error while updating a product from server!');
    })
  }

  deleteProduct(id: String) {
    this.http.delete<Product>(this.base_path + '/' + id).subscribe(data => {
      console.log('Product has been deleted successfully!');
      const index = this.products.findIndex(obj => obj._id.toString() === id);
      this.products.splice(index, 1);
      this.dataSubject.next(this.products);
    }, error => {
      console.log('There has been an error while deleting a product from server!');
    })
  }

  //
  // updateProduct(id, item): Observable<Product> {
  //   return this.http
  //     .put<Product>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }
  //
  // deleteProduct(id) {
  //   return this.http
  //     .delete<Product>(this.base_path + '/' + id, this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }
}

