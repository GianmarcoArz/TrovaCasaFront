import { StatoImmobile } from "./i-immobili";

export interface ImmobileDTO {
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
  giardino: boolean;
  terrazzo: boolean;
  ascensore: boolean;
  cantina: boolean;
  riscaldamento: boolean;
  climatizzazione: boolean;
  allarme: boolean;
  sorveglianza: boolean;
  statoImmobile: StatoImmobile;
  dataDiInserimento?: Date;
  userId?: number;
}
