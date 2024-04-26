import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { LoggerComponent } from './modules/logger/logger.component';
import { TerminalComponent } from './modules/terminal/terminal.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutsComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'logger',
                component:LoggerComponent
            },
            {
                path:'settings',
                component:SettingsComponent
            },
            {
                path:'terminal',
                component:TerminalComponent
            }
        ]
    }
];
