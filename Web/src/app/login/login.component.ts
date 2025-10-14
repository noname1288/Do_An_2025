import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../types/Auth';
import { AuthService } from '../../services/models/auth.service';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  data: Login = {
    email: "",
    password: ""
  }

  loading = false;
  errMsg: string | null = null

  constructor(private authService: AuthService, private router: Router) {};

  onSubmit(): void {
    this.loading = true;
    this.errMsg = null;

    const response = this.authService.login(this.data).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success && res.data.user.role==='admin') {
          console.log(res)
          this.router.navigate(['/goodJob'])
        }
      },
      error: (err) => {
        this.errMsg = err.error?.error
      }
    })

    console.log(response)
  }
}
