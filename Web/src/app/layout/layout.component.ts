import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/models/auth.service';
import { Admin } from '../../types/Client';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from '../../services/pages/layout.service';
import { PaymentService } from '../../services/models/payment.service';
import { ErrMsgService } from '../../services/pages/errMsg.service';

@Component({
  selector: 'layout-component',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent implements OnInit {
  active: string = "Home"
  client: Admin | null = null;
  currentUrl: string = ''

  qrCode: { loadingQRCode: boolean, imgQRCode: string, orderID: string } = {
    loadingQRCode: false,
    imgQRCode: 'kjhjvjbbhj',
    orderID: ''
  }

  errMsg: string = '';

  constructor(private router: Router, private layoutService: LayoutService, private errMsgService: ErrMsgService, private authService: AuthService, private paymentService: PaymentService) {
    this.authService.currentClient$.subscribe(client => {
      this.client = client
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    })
  }

  ngOnInit(): void {
    this.layoutService.qrCode$.subscribe(data => {
      this.qrCode = data;
    })

    this.errMsgService.errMsg$.subscribe(msg => this.errMsg = msg)
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  isActive(): string {
    console.log(this.currentUrl)
    if (this.currentUrl==='/goodJob' || this.currentUrl.includes('/goodJob/register')) {
      return '/goodJob';
    }
    else return this.currentUrl;
  }

  hiddenMsg(): void {
    this.errMsgService.sendMsg('');
  }
}
