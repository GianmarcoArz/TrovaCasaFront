import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      alert('Per favore, riempi correttamente tutti i campi.');
      return;
    }

    const loginData = this.form.value;
    this.authSvc.login(loginData).pipe(take(1)).subscribe(
      (res) => {
        this.router.navigate(['/home']);
        alert('Login effettuato correttamente');
        console.log(res);
      },
      (err) => {
        alert('Credenziali errate');
        console.error(err);
      }
    );
  }
}
