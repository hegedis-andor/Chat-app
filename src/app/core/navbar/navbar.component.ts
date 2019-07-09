import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }


}
