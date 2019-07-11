import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers()
  }

}
