import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Order } from "../../../../types/Order";
import { typeStatus } from "../../../../utils/data";
import { StatusKey } from "../../../../types/Other";
import { Worker } from "../../../../types/Client";
import { LayoutService } from "../../../../services/pages/layout.service";

@Component({
    selector: 'management-payment-qr-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
    ],
    templateUrl: './management-payment-qr.component.html',
    styleUrls: ['../../management-payment.component.css']
})

export class ManagementPaymentQRComponent implements OnChanges {

    @Input() ordersOriginal: Order[] | null = null;

    typeStatus: Record<StatusKey, { name: string, color: string }> = typeStatus;
    orders: Order[] | null = null;

    searchClient: string = '';

    filterCreatedAt: boolean = true;
    filterPayment: boolean | undefined = false;
    filterStatus = ['All'];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['ordersOriginal'] && this.ordersOriginal) {
            this.orders = this.ordersOriginal;
        }
    }

    getDate(date: string): string {
        return date.split(' ')[1];
    }

    //filterCreatedAt
    onFilterCreatedAt(status: boolean): void {
        this.filterCreatedAt = status;
        this.filterOrder();
    }

    // filterStatus
    isCheckedStatus(status: string): boolean {
        if (this.filterStatus.includes(status)) return true;
        return false;
    }

    onFilterStatus(status: string): void {
        if (this.filterStatus.includes(status)) {
            this.filterStatus = this.filterStatus.filter(doc => doc!==status);
        }
        else {
            if (status==='All') {
                this.filterStatus = ['All'];
            }
            else {
                this.filterStatus = this.filterStatus.filter(doc => doc!=='All');
                this.filterStatus.push(status);
            }
        }
        this.filterOrder();
    }

    filterOrder(): void {
        this.orders = this.ordersOriginal;

        if (this.searchClient.length!==0) {

            let search = this.searchClient.toLowerCase();
            this.orders = this.orders?.filter(
                order => {
                    const userDoc = order.user?.username?.toLowerCase() ?? '';
                    const workerDoc = order.worker?.username?.toLowerCase() ?? '';

                    return userDoc.includes(search) || workerDoc.includes(search);
                }
            ) ?? [];
        }

        if (!this.filterCreatedAt) {
            this.orders = this.orders?.reverse() ?? [];
        }

        if (this.filterStatus.includes('All')) return;
        this.orders = this.orders?.filter(order => this.filterStatus.includes(order.status)) ?? [];
    }
}