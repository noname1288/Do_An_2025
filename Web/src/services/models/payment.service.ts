import { Injectable } from "@angular/core";
import { API } from "../api";
import { BehaviorSubject, Observable } from "rxjs";
import { Payment } from "../../types/Payment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Fail, Success } from "../../types/Response";

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private apiUrl = `${API}/payments`;
    private paymentSubject = new BehaviorSubject<Payment | null>(null);
    public payment$ = this.paymentSubject.asObservable();

    constructor(private http: HttpClient) {}

    getPayments(): Observable<
        { success: boolean; message: string, payments: Payment[] } | Fail
    > {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        return this.http.get<{ success: boolean; message: string, payments: Payment[] } | Fail>(this.apiUrl, { headers });
    }

    checkPaid(orderID: string): Observable<Success | Fail> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        return this.http.post<Success | Fail>(`${this.apiUrl}/check-payment/${orderID}`, {}, { headers });
    }
}