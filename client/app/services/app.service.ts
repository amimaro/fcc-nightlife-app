import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any;
  isLoggedIn: boolean = false;
  locations: any;
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/'

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getIsLoggedIn();
  }

  routeTo(route) {
    this.router.navigate(route);
  }

  getUser() { return this.user; }

  getSession() {
    return this.http.get(this.apiUrl + 'user/auth/session');
  }

  loginTwitter() {
    window.location.href = '/api/user/auth/twitter/login';
  }

  logoutTwitter() {
    window.location.href = '/api/user/auth/logout';
  }

  getIsLoggedIn() {
    this.getSession()
      .subscribe(
      res => {
        this.isLoggedIn = true;
        console.log(this.isLoggedIn)
      },
      err => {
        this.isLoggedIn = false;
        console.log(this.isLoggedIn)
      });
  }

  search(location) {
    this.http.post(this.apiUrl + 'yelp', { location: location })
      .subscribe(
      res => {
        res = JSON.parse(res+"");
        console.log(res);
        this.locations = res;
      },
      err => {
        err = JSON.parse(err+"")
        console.log(err);
        this.message = err;
      });
  }

}
