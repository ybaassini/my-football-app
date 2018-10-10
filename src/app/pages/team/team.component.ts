import { Component, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/common/interfaces/player.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public players: IPlayer[];
  public team: string;
  constructor(private _route: ActivatedRoute) { }

  public ngOnInit() {
    this.players = this._route.snapshot.data.players.player;
    this.team = this.players[0].strTeam;
  }

  public goBack() {
    window.history.back();
  }

}
