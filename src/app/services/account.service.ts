import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  isLoggedIn() {
    return localStorage.getItem('userInfo');
  }

  login(username: string, password: string) {
    return this.httpClient.post(`${environment.apiEndpoint}/account/login`, {
      email: username,
      password: password
    })
  }
}
