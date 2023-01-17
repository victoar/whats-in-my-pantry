import { Injectable } from '@angular/core';
import {Network} from "@capacitor/network";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() {
    Network.addListener('networkStatusChange', (status) => {
      console.log("network changed!");
    });
  }

  getNetworkStatus(): Promise<{ connected: boolean, connectionType: string }> {
    return Network.getStatus();
  }

}
