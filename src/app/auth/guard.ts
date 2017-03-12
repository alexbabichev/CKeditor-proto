import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class Guard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {
      return true;
    }

    console.log('not');
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
}
