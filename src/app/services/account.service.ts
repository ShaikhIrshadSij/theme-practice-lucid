import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccountService {
  isLoggedIn() {
    return localStorage.getItem('userInfo');
  }

  login(username: string, password: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(username);
      }, 3000);
    });
  }
}
