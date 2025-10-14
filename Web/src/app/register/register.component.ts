import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Register } from "../../types/Auth";
import { AuthService } from "../../services/models/auth.service";
import { ErrMsgService } from "../../services/pages/errMsg.service";

@Component({
    selector: 'register-component',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})

export class RegisterComponent implements OnInit {
    type: Record<string, string> = {
        user: "Khách hàng",
        worker: "Người làm"
    };

    role: string = 'worker';

    data: Register = {
        email: '',
        password: '',
        confirmPassword: '',
        role: 'worker'
    }

    constructor(private router: ActivatedRoute, private errMsgService: ErrMsgService, private authService: AuthService) {}

    ngOnInit(): void {
        this.router.queryParams.subscribe(params => {
            this.role = params['role'];
            this.data.role = params['role'];
        })
    }

    onRegister() {
        this.authService.register(this.data).subscribe({
            next: (res) => {
                if (res.success) {
                    this.errMsgService.sendMsg(res.message);
                }
            },
            error: (err) => {
                this.errMsgService.sendMsg(err.error?.error);
            }
        })
    }
}