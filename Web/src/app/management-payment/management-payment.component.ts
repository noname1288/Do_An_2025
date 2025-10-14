import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Order } from "../../types/Order";
import { OrderService } from "../../services/models/order.service";
import { ManagementPaymentQRComponent } from "./components/qr/management-payment-qr.component";
import { ManagementPaymentChartComponent } from "./components/chart/management-payment-chart.component";

@Component({
    selector: 'management-payment-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ManagementPaymentQRComponent,
        ManagementPaymentChartComponent,
    ],
    templateUrl: './management-payment.component.html',
    styleUrl: './management-payment.component.css'
})

export class ManagementPaymentComponent implements OnInit {

    ordersOriginal: Order[] | null = null;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe(res => {
            if (res.success) {
                this.ordersOriginal = res.orders;
            }
        })
    } 
}