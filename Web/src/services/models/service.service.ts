import { Injectable } from "@angular/core";
import { API } from "../api";
import { BehaviorSubject, Observable } from "rxjs";
import { CleaningService, HealthcareService, MaintenanceService } from "../../types/Service";
import { HttpClient } from "@angular/common/http";
import { Fail } from "../../types/Response";
import { Duration, Shift } from "../../types/Time";

@Injectable({ providedIn: 'root' })
export class ServiceService {
    private apiUrl = `${API}/services`;
    private cleaningServiceSubject = new BehaviorSubject<CleaningService | null>(null);
    private healthcareServiceSubject = new BehaviorSubject<HealthcareService | null>(null);
    private maintenanceServiceSubject = new BehaviorSubject<MaintenanceService | null>(null);

    public cleaingService$ = this.cleaningServiceSubject.asObservable();
    public healthcareService$ = this.healthcareServiceSubject.asObservable();
    public maintenanceService$ = this.maintenanceServiceSubject.asObservable();

    constructor(private http: HttpClient) {}

    getCleaningServices(): Observable<{ 
        success: true, 
        message: string, 
        data: {
            services: CleaningService[],
            durations: Duration[]
        } 
    } | Fail> {

        return this.http.get<
            { success: true,  message: string,  data: { services: CleaningService[], durations: Duration[] } } | Fail
        >(`${this.apiUrl}/cleaning`)
    }

    getHealthcareService(): Observable<{
        success: true, 
        message: string, 
        data: {
            services: HealthcareService[],
            shifts: Shift[]
        } 
    } | Fail> {
        return this.http.get<
            { success: true, message: string, data: { services: HealthcareService[], shifts: Shift[] } } | Fail
        >(`${this.apiUrl}/healthcare`)
    }

    getMaintenanceService(): Observable<{
        success: true, 
        message: string, 
        data: MaintenanceService[]
    } | Fail> {
        return this.http.get<
            { success: true, message: string, data: MaintenanceService[] } | Fail
        >(`${this.apiUrl}/maintenance`)
    }
}