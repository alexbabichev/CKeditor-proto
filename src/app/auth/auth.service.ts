import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  logged = false;

  constructor() { }

  isLoggedIn() {
    console.log('logged', this.logged);
    return this.logged;
  }

  login() {
    this.logged = true;
    
  }

}
