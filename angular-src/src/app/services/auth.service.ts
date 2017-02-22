import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {tokenNotExpired} from 'angular2-jwt'

@Injectable()
export class AuthService {
  authToken: any
  user: any

  private baseUrl = `http://localhost:3000`;

  constructor(private http: Http) {
  }

  private getJson(res: Response) {
    return res.json();
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${this.baseUrl}/users/register`, user, {headers: headers})
      .map(this.getJson)
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${this.baseUrl}/users/authenticate`, user, {headers: headers})
      .map(this.getJson)
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json')
    return this.http.get(`${this.baseUrl}/users/profile`, {headers: headers})
      .map(this.getJson)
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired()
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  }

}
