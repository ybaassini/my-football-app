import { Component } from '@angular/core';
import { ApiHandlerService } from './lib';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-football-app';
  constructor(
    public apiHandlerService: ApiHandlerService,
    public router: Router) {

  }

  ngOnInit() {
    this.scrollTopOnRouteChange();
  }

  public scrollTopOnRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
