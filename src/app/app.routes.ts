import { Routes } from '@angular/router';
import { GetPlayerResolver } from './core/resolvers/players.resolver';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
    },
    {
        path: 'team/:slug',
        loadChildren: './pages/team/team.module#TeamModule',
        resolve: {
            players: GetPlayerResolver
        }
    }
];
