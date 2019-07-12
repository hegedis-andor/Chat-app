import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  logout() {
    this.authService.logout();
  }


}
