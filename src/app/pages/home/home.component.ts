import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../core/services/team.service';
import { ITeam } from '../../common/interfaces/team.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public league: string = '';
  public teams: ITeam[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  /**
   * getTeams
   */
  public getTeams(event) {
    this.league = event.target.value;
    this.teamService.getTeams(this.league).subscribe((t) => this.teamService.teams.next(t.teams));
  }

}
