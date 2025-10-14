import { Component, OnInit } from "@angular/core";
import { ManagementJobChartComponent } from "./components/chart/management-job-chart.component";
import { ManagementJobCleaningComponent } from "./components/cleaning-service/management-job-cleaning.component";
import { Payment } from "../../types/Payment";
import { CleaningService, HealthcareService, MaintenanceService } from "../../types/Service";
import { Duration, Shift } from "../../types/Time";
import { PaymentService } from "../../services/models/payment.service";
import { ServiceService } from "../../services/models/service.service";
import { forkJoin } from "rxjs";

@Component({
    selector: 'management-job-component',
    standalone: true,
    imports: [
        ManagementJobChartComponent,
        ManagementJobCleaningComponent
    ],
    templateUrl: './management-job.component.html',
    styleUrls: ['./management-job.component.css'],
})

export class ManagementJobComponent implements OnInit {
    cleaningServices: { services: CleaningService[], durations: Duration[] } | null = null;
    healthcareServices: { services: HealthcareService[], shifts: Shift[] } | null = null;
    maintenanceServices: MaintenanceService[] | null = null;

    constructor(private serviceService: ServiceService) {}

    ngOnInit(): void {
        forkJoin({
            cleaning: this.serviceService.getCleaningServices(),
            healthcare: this.serviceService.getHealthcareService(),
            maintenance: this.serviceService.getMaintenanceService(),
        }).subscribe(res => {

            if (res.cleaning.success) {
                this.cleaningServices = res.cleaning.data;
            }

            if (res.healthcare.success) {
                this.healthcareServices = res.healthcare.data;
            }
            
            if (res.maintenance.success) {
                this.maintenanceServices = res.maintenance.data;
            }
        })
    }
}