import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LayoutService {
    private qrCodeSubject = new BehaviorSubject<{ loadingQRCode: boolean, imgQRCode: string, orderID: string }>({
        loadingQRCode: false,
        imgQRCode: 'imgQRCode',
        orderID: ''
    })
    public qrCode$ = this.qrCodeSubject.asObservable();

    sendData(loadingQRCode: boolean, imgQRCode: string, orderID: string): void {
        this.qrCodeSubject.next({ loadingQRCode: loadingQRCode, imgQRCode: imgQRCode, orderID: orderID });
    }
}