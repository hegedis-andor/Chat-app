import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }


}
