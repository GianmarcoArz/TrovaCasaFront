export const environment = {
  registerUrl: 'http://localhost:8080/api/auth/register-user',
  loginUrl: 'http://localhost:8080/api/auth/login',
  ImmobileUrl: 'http://localhost:8080/immobili/crea_annuncio_immobile',
  immobiliUserUrl: 'http://localhost:8080/immobili/user',
  uploadImmagineUrl: 'http://localhost:8080/immobili/{immobileId}/upload_immagine',
  getImmaginiUrl: 'http://localhost:8080/immagini_immobili/{immobileId}',
  deleteImmobileUrl: 'http://localhost:8080/immobili/elimina_immobile/{immobileId}',
  updateImmobileUrl: 'http://localhost:8080/immobili/aggiorna_immobile/{immobileId}',
  creaDisponibilitaUrl: 'http://localhost:8080/api/appuntamenti/{immobileId}/crea_disponibilita',
  aggiornaDisponibilitaUrl: 'http://localhost:8080/api/appuntamenti/{appuntamentoId}/aggiorna_disponibilita',
  eliminaDisponibilitaUrl: 'http://localhost:8080/api/appuntamenti/{appuntamentoId}/elimina_disponibilita',

  immobiliListUrl: 'http://localhost:8080/immobili/lista_Immobili',
  singoloImmobileUrl: 'http://localhost:8080/immobili/{immobileId}',
  pronotaDisponibilitaUrl: 'http://localhost:8080/api/appuntamenti/{appuntamentoId}/prenota_disponibilita',

};
