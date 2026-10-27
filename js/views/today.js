// today.js — tela Hoje do hub. Responde em segundos: o que está previsto hoje,
// o que já foi feito e como está a semana. Lançar algo leva 1 toque.

import { carregarDia, carregarSemana } from "../services/agenda.js";
import { carregarDia as carregarDiaNutricao } from "../services/nutricao.js";
import { hoje as hojeISO, nomeDiaSemana, deISODate } from "../services/dates.js";
import { el, card, botao, tituloVista } from "./components/ui.js";
import { linhaEntrada, sheetSessaoAvulsa, cardResumoSemana } from "./components/agenda-ui.js";
import { cardProteina, cardRefeicoesHoje } from "./components/nutricao-ui.js";

function dataExtensa(iso) {
  const d = deISODate(iso);
  const dia = nomeDiaSemana(iso);
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function cardAgenda(entradas, data) {
  const filhos = [el("p", { class: "eyebrow", text: "Agenda de hoje" })];
  if (!entradas.length) {
    filhos.push(el("p", { class: "sub", text: "Descanso: nada previsto para hoje." }));
  } else {
    filhos.push(el("div", { class: "agenda-lista" }, entradas.map((e) => linhaEntrada(e, data))));
  }
  filhos.push(el("div", { class: "agenda-acoes" }, [
    botao("+ Treino fora da agenda", { variante: "ghost", onClick: () => sheetSessaoAvulsa(data) }),
  ]));
  return card(filhos);
}

export async function renderHoje(container) {
  const data = hojeISO();
  const [entradas, semana, nutricao] = await Promise.all([
    carregarDia(data),
    carregarSemana(data),
    carregarDiaNutricao(data),
  ]);

  container.appendChild(tituloVista("Hoje"));
  container.appendChild(el("p", { class: "hoje-data", text: dataExtensa(data) }));

  container.appendChild(cardAgenda(entradas, data));
  container.appendChild(cardProteina(nutricao));
  container.appendChild(cardRefeicoesHoje(nutricao));
  container.appendChild(cardResumoSemana(semana, { titulo: "Esta semana" }));
}
