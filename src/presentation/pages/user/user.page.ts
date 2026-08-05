import { Component } from '@angular/core';
import { UserService } from '../../application/services/userService';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  user: any;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getUserById('1');
    } catch (error) {
      console.error(error);
    }
  }
}