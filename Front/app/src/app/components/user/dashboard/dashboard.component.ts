import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	active = 'profil';

  user: User = {
    id: 0,
    username: '',
    email: '',
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.me().subscribe(data => {
      this.user = data
    })
  }
}
