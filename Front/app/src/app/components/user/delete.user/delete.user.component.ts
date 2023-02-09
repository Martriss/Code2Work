import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete.user.component.html',
  styleUrls: ['./delete.user.component.scss']
})
export class DeleteUserComponent {

  @Input() user: User = {
    id: 0,
    username: '',
    email: '',
  }

  constructor(private userService: UserService) { }

  delete() {
    this.userService.delete(this.user.id).subscribe(() => {})
  }
}
