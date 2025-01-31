import { Component, OnInit } from '@angular/core';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // Aggiungi ActivatedRoute
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Correggi: styleUrls, non styleUrl
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formData: iLoginRequest = {
    username: '',
    password: '',
  };
  returnUrl: string = '/home'; // URL di default dopo il login

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute // Aggiungi ActivatedRoute per gestire i queryParams
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Ottieni il parametro returnUrl dall'URL (se presente)
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/home'; // Se non c'è returnUrl, usa '/home'
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.login();
    }
  }

  login() {
    if (this.form.valid) {
      const formData: iLoginRequest = this.form.value;
      this.authSvc.login(formData).pipe(take(1)).subscribe(
        (data) => {
          // Reindirizza alla pagina richiesta (o alla home di default)
          this.router.navigateByUrl(this.returnUrl);
          alert('Login effettuato correttamente');
        },
        (error) => {
          alert('Errore nel login: ' + error.message);
        }
      );
    }
  }
}
