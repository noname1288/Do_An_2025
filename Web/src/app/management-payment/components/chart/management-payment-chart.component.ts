import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from 'ng2-charts';

import { Order } from "../../../../types/Order";
import { typeStatus } from "../../../../utils/data";
import { StatusKey } from "../../../../types/Other";

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PieController
} from 'chart.js';


Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

@Component({
    selector: 'management-payment-chart-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        BaseChartDirective,
    ],
    templateUrl: './management-payment-chart.component.html',
    styleUrls: ['../../management-payment.component.css']
})

export class ManagementPaymentChartComponent implements OnChanges {

    @Input() ordersOriginal: Order[] | null = null;

    typeStatus: Record<StatusKey, { name: string, color: string }> = typeStatus;

    // Bar Chart
    labelsBar = Object.values(typeStatus).map(status => status.name);
    colorsBar = Object.values(typeStatus).map(status => status.color);
    borderThickness: number = 35;

    barChartData: ChartData<'bar'> | undefined = undefined;
    barChartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { 
                display: true, 
                text: 'Biểu đồ thanh toán', 
                font: { size: 20 },
                position: "top",
                padding: {
                    bottom: 30
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#000000',
                    font: { size: 14 }
                }
            }
        }
    };


    // Pie Chart
    labelsPie = ['Đã thanh toán', 'Chưa thanh toán'];
    colorsPie = ['#4CAF50', '#F44336'];
    quantitiesPie: number[] | undefined = undefined;

    // pieChartData: ChartData<'pie'> | undefined = undefined;
    // pieChartOptions: ChartOptions<'pie'> = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //         legend: { display: true, position: 'bottom' },
    //         title: { 
    //             display: true, 
    //             text: 'Biểu đồ yêu cầu', 
    //             font: { size: 20 },
    //             position: "top",
    //             padding: {
    //                 bottom: 30
    //             }
    //         }
    //     }
    // };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['ordersOriginal'] && this.ordersOriginal) {
            this.barChartData = this.getBarChart(this.ordersOriginal);
            // this.pieChartData = this.getPieChart(this.ordersOriginal);
        }
    }

    // Chart: Bar + Pie
    getBarDatas(orders: Order[]): number[] {
        const data = new Array(this.labelsBar.length).fill(0);
        
        for (let i = 0; i < this.labelsBar.length; i++) {
            data[i] = orders.filter(order => typeStatus[order.status].name===this.labelsBar[i]).length;
        }
        return data;
    }

    getBarChart(orders: Order[]): ChartData<'bar'> {
        const chart: ChartData<'bar'> = {
            labels: this.labelsBar,
            datasets: [
                { 
                    label: 'Tổng số yêu cầu',
                    data: new Array(this.labelsBar.length).fill(orders.length), 
                    backgroundColor: new Array(this.labelsBar.length).fill('#adaaaaff'),
                    barThickness: this.borderThickness
                },
                { 
                    data:  this.getBarDatas(orders),
                    backgroundColor: this.colorsBar,
                    barThickness: this.borderThickness
                },
            ]
        };
        return chart;
    }

    // getPieDatas(orders: Order[]): number[] {
    //     const truePayment = orders.filter(order => order.status==='Completed' && order.isPayment).length;
    //     const falsePayment = orders.filter(order => order.status==='Completed' && !order.isPayment).length;

    //     this.quantitiesPie = [truePayment, falsePayment];
    //     return [truePayment, falsePayment];
    // }

    // getPieChart(orders: Order[]): ChartData<'pie'> {
    //     const chart: ChartData<'pie'> = {
    //         labels: this.labelsPie,
    //         datasets: [
    //             {
    //                 data: this.getPieDatas(orders),
    //                 backgroundColor: this.colorsPie,
    //                 borderWidth: 0,
    //             }
    //         ]
    //     };
    //     return chart;
    // }

    getAllPayment(): number | undefined {
        return this.quantitiesPie?.reduce((sum, quantity) => sum+quantity, 0);
    }
}