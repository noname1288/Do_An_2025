import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: 'forgot-password-component',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: '../login/login.component.css'
})

export class ForgotPasswordComponent {
    account = {
        email: "",
        code: ""
    }
}