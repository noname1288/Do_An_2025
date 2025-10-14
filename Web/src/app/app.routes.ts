import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagementPaymentComponent } from './management-payment/management-payment.component';
import { ManagementJobComponent } from './management-job/management-job.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { 
        path: 'goodJob', 
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'register',  component: RegisterComponent },
            { path: 'managementPayment', component: ManagementPaymentComponent },
            { path: 'profile',  component: ProfileComponent },
            { path: 'managementJob', component: ManagementJobComponent },
        ] 
    },
];
