import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formData: Partial<iUser> = {};

  constructor(private authSvc: AuthService, private router: Router) {}

  register() {
    this.authSvc.registerUser(this.formData).subscribe((res) => {
      this.router.navigate(['/auth/login']);
      alert('registrazione effettuata correttamente');
      console.log(res);
    });
  }
}
