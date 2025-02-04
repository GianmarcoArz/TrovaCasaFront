import { iAppuntamento } from "./i-appuntamento";
import { iUser } from "./i-user";

export interface iImmobili {
  id: number;
  titolo: string;
  descrizione: string;
  prezzo: number;
  metriQuadri: number;
  numeroVani: number;
  piano: number;
  via: string;
  civico: number;
  comune: string;
  provincia: string;
  postoAuto: boolean;
  giardino?: boolean;
  terrazzo?: boolean;
  ascensore?: boolean;
  cantina?: boolean;
  riscaldamento?: boolean;
  climatizzazione?: boolean;
  allarme?: boolean;
  sorveglianza?: boolean;
  dataDiInserimento: Date;
  statoImmobile: StatoImmobile;
  user: iUser;
  immagini: ImmagineImmobile[];
  disponibilita: iAppuntamento[];
}

export enum StatoImmobile {
  NUOVO = 'NUOVO',
  USATO = 'USATO',
  RISTRUTTURATO = 'RISTRUTTURATO',
  RISTRUTTURARE = 'DA_RISTRUTTURARE'
}

export interface ImmagineImmobile {
  id: number;
  urlImmagine: string;
  copertina:String;
  immobile: iImmobili;
}
