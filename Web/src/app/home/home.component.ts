import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  categories: string[] = [
    "Dọn dẹp vệ sinh",
    "Chăm sóc sức khỏe",
    "Bảo trì thiết bị"
  ];

  policies: string[] = [
    "Công việc theo ngày",
    "Công việc linh hoạt",
    "Dễ dàng tìm việc"
  ];

  constructor(private router: Router) {}

  onRegister(role: 'user' | 'worker'): void {
    this.router.navigate(['/goodJob/register'], { queryParams: { role } });
  }
}
