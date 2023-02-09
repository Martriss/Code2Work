import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  collapsed = true;
  isLog: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      this.isLog = data ? true : false;
    })

    if (localStorage.getItem('role') === 'admin')
      this.isAdmin = true;
  }

  logout() {
    this.authService.logout()
  }

}
