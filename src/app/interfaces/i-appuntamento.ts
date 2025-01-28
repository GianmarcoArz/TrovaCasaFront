import { iImmobili } from "./i-immobili";

export interface iAppuntamento {
  id: number;
  dataDisponibilita: Date;
  oraInizio: string;
  oraFine: string;
  prenotato: boolean;
  immobile: iImmobili [];
}
