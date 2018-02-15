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
    if (this.isLocalEmpty()) {
      this.message = 'Start by placing some search...';
      this.locations = [];
      localStorage.setItem("nightlife-local", JSON.stringify(this.locations));
    } else {
      this.clearMessage();
      this.locations = JSON.parse(localStorage.getItem("nightlife-local"));
    }
  }

  isLocalEmpty() {
    return localStorage.getItem("nightlife-local") === 'undefined' || localStorage.getItem("nightlife-local") === null;
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

  loadingMessage() {
    this.message = 'Loading...';
  }

  clearMessage() {
    this.message = '';
  }

  clearLocations() {
    this.locations = [];
  }

  saveLocations() {
    localStorage.setItem("nightlife-local", JSON.stringify(this.locations));
  }

  search(location) {
    this.loadingMessage();
    this.http.post(this.apiUrl + 'yelp', { location: location })
      .subscribe(
      res => {
        console.log(res);
        this.locations = res;
        this.clearMessage();
        this.saveLocations()
      },
      err => {
        console.log(err);
        this.message = 'Location not found :/';
      });
  }

}
