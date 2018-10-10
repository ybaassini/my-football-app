import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './services/team.service';
import { GetPlayerResolver } from './resolvers/players.resolver';

const providers = [
  TeamService
];

const resolvers = [
  GetPlayerResolver
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ...providers,
    ...resolvers
  ]
})
export class CoreModule { }
