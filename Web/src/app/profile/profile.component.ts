import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService, } from "../../services/models/auth.service";
import { Admin } from "../../types/Client";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "profile-component",
    standalone: true,
    imports: [
        RouterModule,
        FormsModule,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})

export class ProfileComponent {

    data = {
        uid: '',
        username: '',
        gender: '',
        dob: '01/01/1990',
        avatar: '',
        tel: '',
        location: ''
    };
    client: Admin | null = null;

    constructor (private authService: AuthService) {
        this.authService.currentClient$.subscribe(client => {
            this.client = client;
            this.data.uid = client?.uid ?? '';
            this.data.gender = client?.gender ?? 'Nam';
            this.data.dob = this.formatDate(client?.dob ?? this.data.dob)
        })
    }

    formatDate(date: string): string {
        const [ day, month, year ] = date.split('/');
        return `${year}-${month}-${day}`;
    }

    formatDateAPI(): string {
        const [ year, month, day ] = this.data.dob.split('-');
        return `${day}/${month}/${year}`;
    }

    onDelete(key: keyof typeof this.data): void {
        this.data[key] = '';
    }

    onChangeGender(gender: string): void {
        this.data.gender = gender;
    }
}