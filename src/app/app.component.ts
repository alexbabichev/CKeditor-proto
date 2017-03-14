import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';

  ckeditorContent = 'ckeditor <b>content</b>';
  
  constructor(private authService: AuthService, private router: Router) { };

  onClickMe = function () {
    this.authService.login();
    this.router.navigate([''], {});
  }
}
