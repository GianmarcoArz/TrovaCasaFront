import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ImmobileDTO } from '../interfaces/immobile-dto';
import { catchError, Observable, throwError } from 'rxjs';
import { iImmobili, ImmagineImmobile } from '../interfaces/i-immobili';
import { AppuntamentoDTO } from '../interfaces/appuntamento-dto';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private apiUrl = environment.ImmobileUrl;
  private immobiliUserUrl = environment.immobiliUserUrl;
  private uploadImmagineUrl = environment.uploadImmagineUrl;
  private getImmaginiUrl = environment.getImmaginiUrl;
  private updateImmobileUrl = environment.updateImmobileUrl;
  private deleteImmobileUrl = environment.deleteImmobileUrl;
  private creaDisponibilitaUrl = environment.creaDisponibilitaUrl;
  private  aggiornaDisponibilitaUrl = environment.aggiornaDisponibilitaUrl;
  private  eliminaDisponibilitaUrl = environment.eliminaDisponibilitaUrl;
  private immobiliListUrl = environment.immobiliListUrl;
  private singoloImmobileUrl = environment.singoloImmobileUrl;
  private pronotaDisponibilitaUrl = environment.pronotaDisponibilitaUrl;
  private listaPrenotazioniUrl = environment.listaPrenotazioniUrl;



  imagePreviewsMap: { [key: number]: string[] } = {};



  constructor(private http: HttpClient) { }

  creaAnnuncio(immobileDTO: ImmobileDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}`, immobileDTO);
  }

  creaDisponibilita(immobileId: number, appuntamentoDTO: AppuntamentoDTO): Observable<any> {
    const url = this.creaDisponibilitaUrl.replace('{immobileId}', immobileId.toString());
    return this.http.post(url, appuntamentoDTO).pipe(
      catchError(this.handleError)
    );
  }

  aggiornaDisponibilita(disponibilitaId: number, appuntamentoDTO: AppuntamentoDTO): Observable<any> {
    const url = this.aggiornaDisponibilitaUrl.replace('{appuntamentoId}', disponibilitaId.toString());
    return this.http.put(url, appuntamentoDTO).pipe(
      catchError(this.handleError)
    );
  }

  eliminaDisponibilita(disponibilitaId: number): Observable<any> {
    const url = this.eliminaDisponibilitaUrl.replace('{appuntamentoId}', disponibilitaId.toString());
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  getImmobiliUser(): Observable<ImmobileDTO[]> {
    return this.http.get<ImmobileDTO[]>(this.immobiliUserUrl).pipe(
      catchError(this.handleError)
    );
  }
  getImmaginiByImmobileId(immobileId: number): Observable<ImmagineImmobile[]> {
    const url = this.getImmaginiUrl.replace('{immobileId}', immobileId.toString());
    return this.http.get<ImmagineImmobile[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  aggiornaImmobile(immobileId: number, immobileDTO: ImmobileDTO): Observable<any> {
    const url = this.updateImmobileUrl.replace('{immobileId}', immobileId.toString());
    return this.http.put(url, immobileDTO).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  uploadImmagine(immobileId: number, files: File[], copertina: boolean): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('copertina', String(copertina));
    const url = this.uploadImmagineUrl.replace('{immobileId}', immobileId.toString());
    return this.http.post(url, formData);
  }
  hasImagePreviews(immobileId: number): boolean {
    return this.imagePreviewsMap[immobileId] && this.imagePreviewsMap[immobileId].length > 0;
  }
  deleteImmobile(id: number): Observable<any> {
    const url = this.deleteImmobileUrl.replace('{immobileId}', id.toString());
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }


getAllImmobili(): Observable<iImmobili[]> {
  return this.http.get<iImmobili[]>(this.immobiliListUrl).pipe(
    catchError(this.handleError)
  );
}

getImmobileById(immobileId: number): Observable<ImmobileDTO> {
  const url = this.singoloImmobileUrl.replace('{immobileId}', immobileId.toString());
  return this.http.get<ImmobileDTO>(url).pipe(
    catchError(this.handleError)
  );
}
prenotaDisponibilita(appuntamentoId: number): Observable<any> {
  const url = this.pronotaDisponibilitaUrl.replace('{appuntamentoId}', appuntamentoId.toString());
  return this.http.post(url, {}).pipe(
    catchError(this.handleError)
  );
}
getPrenotazioni(): Observable<AppuntamentoDTO[]> {
  return this.http.get<AppuntamentoDTO[]>(this.listaPrenotazioniUrl).pipe(
    catchError(this.handleError)
  );
}
}
