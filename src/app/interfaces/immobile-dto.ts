import { iAppuntamento } from "./i-appuntamento";
import { ImmagineImmobile, StatoImmobile } from "./i-immobili";

export interface ImmobileDTO {
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
  userId: number;
  expanded: boolean;
  immagini: ImmagineImmobile[];
  disponibilita: iAppuntamento[];


}
