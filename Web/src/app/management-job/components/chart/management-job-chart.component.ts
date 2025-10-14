import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseChartDirective } from "ng2-charts";
import { Payment } from "../../../../types/Payment";
import { typeService } from "../../../../utils/data";
import { PaymentService } from "../../../../services/models/payment.service";
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';

Chart.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

@Component({
    selector: 'management-job-chart-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        BaseChartDirective
    ],
    templateUrl: './management-job-chart.component.html',
    styleUrls: ['../../management-job.component.css'],
})

export class ManagementJobChartComponent implements OnInit {
    payments: Payment[] | null = null;
    
    labelsLine = Object.values(typeService).map(service => service.name);
    colorsLine = Object.values(typeService).map(service => service.color);

    lineChartLabels: string[] = Array.from({ length: 12 }, (_, i) => `Tháng ${(i+1).toString().padStart(2, '0')}`);;
    lineChartData: ChartData<'line'> | undefined = undefined;
    lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { 
                display: true,
                text: 'Biểu đồ doanh thu theo tháng' ,
                font: { size: 20 },
                position: "top",
                padding: {
                    bottom: 30
                }
            }
        }
    };

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.getPayments().subscribe(res => {
            if (res.success) {
                this.payments = res.payments;
                this.lineChartData = this.getLineChart(res.payments);
            }
        })
    }

    // Chart
    getDatas(payments: Payment[]) {
        const cleanings = Array(12).fill(0);
        const healthcares = Array(12).fill(0);
        const maintenances = Array(12).fill(0);

        payments.map(payment => {
            const month = parseInt(payment.createdAt.split('/')[1]);
            if (payment.serviceType==='CLEANING') cleanings[month-1] += payment.amount;
            else if (payment.serviceType==='HEALTHCARE') healthcares[month-1] += payment.amount;
            else if (payment.serviceType==='MAINTENANCE') maintenances[month-1] += payment.amount;
        })

        return {
            CLEANING: cleanings,
            HEALTHCARE: healthcares,
            MAINTENANCE: maintenances
        }
    } 

    getLineChart(payments: Payment[]) {

        const datas = this.getDatas(payments);

        const chart: ChartData<'line'> = {
            labels: this.lineChartLabels,
            datasets: [
                { 
                    data: datas['CLEANING'],
                    tension: 0.3,
                    borderColor: typeService['CLEANING'].color
                },
                { 
                    data: datas['HEALTHCARE'],
                    tension: 0.3,
                    borderColor: typeService['HEALTHCARE'].color
                },
                { 
                    data: datas['MAINTENANCE'],
                    tension: 0.3,
                    borderColor: typeService['MAINTENANCE'].color
                },
            ]
        }
        return chart;
    }
}