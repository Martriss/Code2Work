import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  @Input() user: User = {
    id: 0,
    username: '',
    email: ''
  }

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update() {
    this.userService.update(this.user.username, this.user.email, this.user.id).subscribe();
  }
}
