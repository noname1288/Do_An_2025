import { Injectable } from "@angular/core";
import { API } from "../api";
import { BehaviorSubject, Observable } from "rxjs";
import { Order } from "../../types/Order";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Fail } from "../../types/Response";

@Injectable({ providedIn: 'root' })
export class OrderService {
    private apiUrl = `${API}/orders`;
    private ordersSubject = new BehaviorSubject<Order | null>(null);
    public orders$ = this.ordersSubject.asObservable();

    constructor(private http: HttpClient) {}

    getOrders(): Observable<{ success: true, message: string, orders: Order[] } | Fail> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        return this.http.get<{ success: true, message: string, orders: Order[] } | Fail>(this.apiUrl, { headers })
    }
}