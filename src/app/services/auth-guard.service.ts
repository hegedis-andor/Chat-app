/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.authService.user$.map(user => {
      if (user) return true;

      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }} );
      return false;
    })
  }
}
*/