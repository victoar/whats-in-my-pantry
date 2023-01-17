import { Component, OnInit } from '@angular/core';
import {ValidatorService} from "../services/validator.service";
import {DataService, Product} from "../services/data.service";
import {ProductService} from "../services/product.service";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DbService} from "../services/db.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  public name: string | undefined;
  public quantity: string | undefined;
  public desiredQuantity: string | undefined;
  public expirationDate: string | undefined;
  public measurement: string | undefined;
  public price: string | undefined;
  public notFilledError: boolean = false;
  public invalidDataError: boolean = false

  constructor(private validator: ValidatorService,
              private dbService: DbService,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.createProduct({id: 1234});
    // console.log('cacat')
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }


  onSaveButtonPressed() {
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

    if(this.name && this.quantity && this.desiredQuantity && this.measurement && this.expirationDate && this.price) {
      // this.dbService.addProduct(this.name, this.quantity, this.desiredQuantity, this.measurement, this.expirationDate, this.price)
      const product: Product = {
        name: this.name,
        quantity: parseInt(this.quantity),
        desiredQuantity: parseInt(this.desiredQuantity),
        measurement: this.measurement,
        expirationDate: this.expirationDate,
        price: parseInt(this.price)
      }
      this.apiService.createProduct(product);
      this.router.navigate(['/'])
    }
  }
}
