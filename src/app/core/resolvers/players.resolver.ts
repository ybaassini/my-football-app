import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamService } from '../../core/services/team.service';
import { IPlayer } from '../../common/interfaces/player.interface';

@Injectable()
export class GetPlayerResolver implements Resolve<IPlayer[]> {
  constructor(private teamService: TeamService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<IPlayer[]> {
    const team: string = route.paramMap.get('slug');
    return this.teamService.getPlayers(team);
  }
}
