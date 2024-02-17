import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'documentation',
        loadComponent: () => import('./documentation/documentation.component').then((c) => c.DocumentationComponent),
        data: {
            breadcrumb: 'Help_Documentation'
        }
    },
    {
        path: 'sdks',
        loadComponent: () => import('./sdks/sdks.component').then((c) => c.SdksComponent),
        data: {
            breadcrumb: 'Help_SDKS'
        }
    },
    {
        path: 'guides',
        loadComponent: () => import('./guides/guides.component').then((c) => c.GuidesComponent),
        data: {
            breadcrumb: 'Help_Guides'
        }
    },
    {
        path: 'support',
        loadComponent: () => import('./support/support.component').then((c) => c.SupportComponent),
        data: {
            breadcrumb: 'Help_Support'
        }
    },
    { path: '', redirectTo: 'documentation', pathMatch: 'full'},
    { path: '**', redirectTo: 'documentation', pathMatch: 'full'}
]