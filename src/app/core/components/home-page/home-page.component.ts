import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  user$: Observable<User>;
  
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = authService.user$;
   }

  navigateToMainPage() {
    this.router.navigateByUrl("/main");
  }
}
