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
  tipoUser: TipoUser;
  statoImmobile: StatoImmobile;
  user: iUser;
  immagini: ImmagineImmobile[];
  disponibilita: iAppuntamento[];
}

export enum TipoUser {
  PRIVATO = 'PRIVATO',
  AGENZIA = 'AGENZIA'
}

export enum StatoImmobile {
  NUOVO = 'NUOVO',
  USATO = 'USATO',
  RISTRUTTURATO = 'RISTRUTTURATO'
}

export interface ImmagineImmobile {
  id: number;
  url: string;
  copertina:String;
  immobile: iImmobili;
}
