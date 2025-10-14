import { Component, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Duration, Shift } from "../../../../types/Time";
import { CleaningService, HealthcareService, MaintenanceService } from "../../../../types/Service";

type CreateTime = {
    workingHour: number,
    fee: number,
    description: string
}

@Component({
    selector: 'management-job-cleaning-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './management-job-cleaning.component.html',
    styleUrls: ['../../management-job.component.css'],
})

export class ManagementJobCleaningComponent {

    isDisplay: boolean = false;

    isCreateTime: boolean = false;
    contentCreateTime: CreateTime = {
        workingHour: 1,
        fee: 0,
        description: ''
    }
    
    @Input() cleaningServices: { services: CleaningService[], durations: Duration[] } | null = null;

    resetContentCreateTime() {
        this.contentCreateTime = {
            workingHour: 1,
            fee: 0,
            description: ''
        }
    }

    handleDisplay() {
        this.isDisplay = !this.isDisplay;
    }

    handleCreateTime() {
        this.isCreateTime = !this.isCreateTime;
        this.resetContentCreateTime();
    }
}