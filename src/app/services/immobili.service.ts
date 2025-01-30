import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ImmobileDTO } from '../interfaces/immobile-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private apiUrl = environment.ImmobileUrl;
  private immobiliUserUrl = environment.immobiliUserUrl;

  constructor(private http: HttpClient) { }

  creaAnnuncio(immobileDTO: ImmobileDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}`, immobileDTO);
  }

  getImmobiliUser(): Observable<ImmobileDTO[]> {
    return this.http.get<ImmobileDTO[]>(this.immobiliUserUrl);
  }
}
