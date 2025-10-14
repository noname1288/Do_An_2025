import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ForgotPassword, Login, Register } from '../../types/Auth';
import { Admin } from '../../types/Client';
import { Fail } from '../../types/Response';
import { API } from '../api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${API}/auth`;
  private currentClientSubject = new BehaviorSubject<Admin | null>(null);
  public currentClient$ = this.currentClientSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedClient = localStorage.getItem('client');
    if (storedClient) {
      this.currentClientSubject.next(JSON.parse(storedClient));
    }
  }

  login(data: Login): Observable<
    { success: true; message: string; data: { user: Admin; token: string, refreshToken: string } } | Fail
  > {
    return this.http.post<
      { success: true; message: string; data: { user: Admin; token: string, refreshToken: string } } | Fail
    >(`${this.apiUrl}/me`, data).pipe(
      tap((res) => {
        if (res.success && res.data.user.role==='admin') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('client', JSON.stringify(res.data.user));
          this.currentClientSubject.next(res.data.user);
        }
      })
    );
  }

  register(data: Register): Observable<
    { success: boolean, message: string, token: string, refreshToken: string } | Fail
  > {
    return this.http.post<{ success: boolean, message: string, token: string, refreshToken: string } | Fail>(`${this.apiUrl}/create`, data);
  }

  forgotPassword(data: ForgotPassword): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('client');
    this.currentClientSubject.next(null);
  }
}
