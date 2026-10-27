// seed-hub.js — dados iniciais do hub, com UUIDs FIXOS.
//
// Os IDs abaixo foram gerados uma única vez com crypto.randomUUID() e ficam
// congelados no arquivo. Assim o seed é idempotente em qualquer aparelho:
// reinstalar o app ou restaurar um backup nunca duplica estes registros (o
// merge é por ID). Não troque os IDs.
//
// Tudo aqui é ponto de partida: a agenda é editável em Ajustes → Agenda semanal.
// Domingo é descanso (sem itens).

// diaSemana segue Date.getDay(): 0 = domingo … 6 = sábado.
export const AGENDA_PADRAO = [
  { id: "88ac1243-2c20-4da8-a7f5-2a105021c382", diaSemana: 1, periodo: "noite", tipo: "circo", rotulo: "Aula", opcional: false, ordem: 0 },
  { id: "c2959ef8-9035-40f7-a953-4c68c06d184b", diaSemana: 2, periodo: "noite", tipo: "musculacao", rotulo: "Pernas forte", opcional: false, ordem: 0 },
  { id: "8b999876-ea58-4c3a-9bd4-077dcb014eef", diaSemana: 3, periodo: "noite", tipo: "musculacao", rotulo: "Superiores + cardio", opcional: false, ordem: 0 },
  { id: "ae7f8004-4dd0-480c-9200-4878f2bbbf0f", diaSemana: 4, periodo: "noite", tipo: "musculacao", rotulo: "Pernas + cardio", opcional: false, ordem: 0 },
  { id: "b1e9c8f2-eb07-443f-96b2-e606fa86f93d", diaSemana: 5, periodo: "noite", tipo: "circo", rotulo: "Aula", opcional: false, ordem: 0 },
  { id: "b1e573d7-4ece-43c9-9ea8-7826d14c3367", diaSemana: 6, periodo: "manha", tipo: "musculacao", rotulo: "Glúteos forte + cardio", opcional: false, ordem: 0 },
];
