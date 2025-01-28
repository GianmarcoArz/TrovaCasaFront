import { iImmobili } from "./i-immobili";

export interface iUser {
id:number;
username: string;
password: string;
email: string;
nome: string;
cognome: string;
telefono: string;
dataRegistrazione: Date;
immobili: iImmobili[];
roles: Role[];
}

export enum Role {
ROLE_USER = 'ROLE_USER',
ROLE_ADMIN = 'ROLE_ADMIN',
}
