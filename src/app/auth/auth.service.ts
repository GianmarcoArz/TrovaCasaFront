import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { iAccessData } from '../interfaces/i-access-data';
import { Router } from '@angular/router';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
  export class AuthService {
    jwtHelper: JwtHelperService = new JwtHelperService();

    registerUserUrl: string = environment.registerUrl;
    loginUrl: string = environment.loginUrl;
    autoLogoutTimer: any;

    authSubject$ = new BehaviorSubject<iAccessData | null>(null);

    isLoggedIn$ = this.authSubject$.pipe(map((accessData) => !!accessData));

    ilLoggedIn: boolean = false;

    user$ = this.authSubject$.asObservable().pipe(
      tap((accessData) => this.ilLoggedIn == !!accessData),
      map((accessData) => accessData?.user)
    );

    constructor(private http: HttpClient, private router: Router) {
      this.restoreUser();
    }

    registerUser(newUser: Partial<iUser>) {
      return this.http.post<iAccessData>(this.registerUserUrl, newUser);
    }

    getUserRole(): string | null {
      const accessData = this.authSubject$.value;
      if (!accessData) return null;

      const token = accessData.accessToken;
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.roles[0];
    }

    login(authData: iLoginRequest) {
      return this.http.post<iAccessData>(this.loginUrl, authData).pipe(
        tap((accessData) => {
          this.authSubject$.next(accessData); // Aggiorna lo stato di login
          localStorage.setItem('accessData', JSON.stringify(accessData));
          const expDate = this.jwtHelper.getTokenExpirationDate(
            accessData.accessToken
          ) as Date;
          this.autoLogout(expDate);
        })
      );
    }
    logout() {
      this.authSubject$.next(null);
      localStorage.removeItem('accessData');
      this.router.navigate(['/auth/login']);
    }

    autoLogout(expDate: Date) {
      clearTimeout(this.autoLogoutTimer);
      const expMs = expDate.getTime() - new Date().getTime();

      this.autoLogoutTimer = setTimeout(() => {
        this.logout();
      }, expMs);
    }

    restoreUser() {
      const userJson: string | null = localStorage.getItem('accessData');
      if (!userJson) return;
      const accessData: iAccessData = JSON.parse(userJson);
      if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
        localStorage.removeItem('accessData');
        return;
      }
      this.authSubject$.next(accessData); // Aggiorna lo stato di login
    }

    getCurrentUser(): iUser | null {
      return this.authSubject$.value?.user || null;
    }
}
