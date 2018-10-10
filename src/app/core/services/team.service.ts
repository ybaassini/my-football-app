import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITeam } from '../../common/interfaces/team.interface';
import { IPlayer } from '../../common/interfaces/player.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ILeague } from '../../common/interfaces/league.interface';

const URL_API = 'https://www.thesportsdb.com/api/v1/json/1';

@Injectable()
export class TeamService {
  public club: string = '';
  public teams: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>(null);
  constructor(private http: HttpClient) { }

  public getTeams(leagueName: string): Observable<ILeague> {
    return this.http.get<ILeague>(`${URL_API}/search_all_teams.php?l=${leagueName}`);
  }

  public getPlayers(teamName: string): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(`${URL_API}/searchplayers.php?t=${teamName}`);
  }
}
