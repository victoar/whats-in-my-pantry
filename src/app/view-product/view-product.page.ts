import { Component, OnInit } from '@angular/core';
import {DataService, Product} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, NavController} from "@ionic/angular";
import {ProductService} from "../services/product.service";
import {ValidatorService} from "../services/validator.service";
import {DbService} from "../services/db.service";
import {ApiService} from "../services/api.service";
import {NetworkService} from "../services/network.service";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product | undefined;
  public name: string;
  public quantity: string;
  public desiredQuantity: string;
  public measurement: string;
  public expirationDate: string;
  public price: string;
  public notFilledError: boolean = false;
  public invalidDataError: boolean = false

  constructor(private data: DataService,
              private activatedRoute: ActivatedRoute,
              private alertController: AlertController,
              private productService: ProductService,
              private dbService: DbService,
              private apiService: ApiService,
              private networkService: NetworkService,
              private validator: ValidatorService,
              private router: Router) { }

  private id: string;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.id)
    // this.dbService.getProduct(this.id).then(res => {
    //   this.product = res;
    //   console.log(this.product);
    //   this.fillEditFields();
    // })
    this.apiService.getProductById(this.id).subscribe(data => {
      console.log("Product has been retrieved successfully by id!");
      this.product = data['data'];
      this.fillEditFields();
    }, error => {
      console.log("There has been an error in retrieving the product!");
    })
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  fillEditFields() {
    this.name = this.product.name;
    this.quantity = this.product.quantity.toString();
    this.desiredQuantity = this.product.desiredQuantity.toString();
    this.measurement = this.product.measurement;
    this.expirationDate = this.product.expirationDate;
    this.price = this.product.price.toString();
  }

  async onDeleteButtonPressed() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.networkService.getNetworkStatus().then(async (status) => {
              if (status['connected']) {
                this.apiService.deleteProduct(this.id);
                this.router.navigate(['/'])
              } else {
                await this.showNoConnectionAlert();
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }

  onUpdateButtonPressed() {
    this.notFilledError = this.name == '' || this.name == undefined || this.quantity == '' || this.quantity == undefined
      || this.desiredQuantity == '' || this.desiredQuantity == undefined || this.expirationDate == ''
      || this.expirationDate == undefined || this.measurement == '' || this.measurement == undefined
      || this.price == '' || this.price == undefined;

    this.invalidDataError = !(this.validator.onlyLettersAndSpaces(this.name) &&
      this.validator.onlyNumbers(this.quantity) &&
      this.validator.onlyNumbers(this.desiredQuantity) &&
      this.validator.isPrice(this.price) &&
      this.validator.isMeasurement(this.measurement) &&
      this.validator.isItADate(this.expirationDate))

    if (this.notFilledError || this.invalidDataError)
      return;

    if(this.quantity && this.desiredQuantity && this.expirationDate && this.price) {
      let newProduct: Product = {
        name: this.name,
        quantity: parseInt(this.quantity, 10),
        desiredQuantity: parseInt(this.desiredQuantity, 10),
        measurement: this.measurement,
        expirationDate: this.expirationDate,
        price: parseInt(this.price, 10)
      }
      // this.dbService.updateProduct(this.id, newProduct)
      this.networkService.getNetworkStatus().then(async (status) => {
        if (status['connected']) {
          this.apiService.updateProduct(this.id, newProduct);
          this.router.navigate(['/'])
        } else {
          await this.showNoConnectionAlert();
        }
      })
    }
  }

  async showNoConnectionAlert() {
    const alert = await this.alertController.create({
      header: 'No Network Connection',
      message: 'Please check your internet connection.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
