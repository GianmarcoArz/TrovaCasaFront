import { iImmobili } from "./i-immobili";
import { iUser } from "./i-user";

export interface iAppuntamento {
  id: number;
  dataDisponibilita: Date;
  oraInizio: string;
  oraFine: string;
  prenotato: boolean;
  immobile: iImmobili [];
  creatoreAnnuncio: iUser;
  utentePrenotato: iUser | null;
}
