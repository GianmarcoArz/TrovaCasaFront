import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iImmobili } from '../interfaces/i-immobili';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  ImmbileUrl:string = environment.ImmobileUrl;

  constructor(private http: HttpClient) { }

  creaImmobile(immobile:iImmobili) {
    return this.http.post<iImmobili>(environment.ImmobileUrl, immobile);
  }
}
