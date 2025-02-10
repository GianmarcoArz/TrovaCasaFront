import { iImmobili } from "./i-immobili";
import { iUser } from "./i-user";

export interface AppuntamentoDTO {
  dataDisponibilita: Date;
  oraInizio: string;
  oraFine: string;
  immobile: iImmobili [];
    creatoreAnnuncio: iUser;
    utentePrenotato: iUser | null;
}
