import { Component } from '@angular/core';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  timer: any;
  title = 'app';
  searchInput: string = "";

  constructor(public appService: AppService) { }

  login() {
    this.appService.loginTwitter();
  }

  logout() {
    this.appService.logoutTwitter();
  }

  typing() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.search();
    }, 1000);
  }

  search() {
    this.appService.search(this.searchInput)
  }

}
