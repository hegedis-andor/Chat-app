import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user$;
  
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
   }

  ngOnInit() {
  }

  navigateToMainPage() {
    this.router.navigateByUrl("/main");
  }
}
