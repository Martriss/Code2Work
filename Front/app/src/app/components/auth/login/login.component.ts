import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })}

  login() {
    this.authService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      this.authService.userSubject.next(data.toString());
    })
  }

}
