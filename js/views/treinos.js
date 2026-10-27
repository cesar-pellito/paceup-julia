// treinos.js — aba Treinos: a semana (agenda com checks, aderência e arrastar).

import { carregarSemana, primeiroDiaSemana, podeMover, moverEntrada, ROTULO_PERIODO } from "../services/agenda.js";
import { hoje as hojeISO, somarDias, inicioDaSemana, deISODate, nomeDiaSemana } from "../services/dates.js";
import { irPara, recarregar } from "./router.js";
import { el, botao, tituloVista, toast } from "./components/ui.js";
import { linhaEntrada, sheetSessaoAvulsa, cardResumoSemana } from "./components/agenda-ui.js";
import { ativarArrastar } from "./components/arrastar.js";

// Semana exibida no segmento "Semana" (sobrevive a recarregar(); volta para a
// semana atual ao reabrir o app).
let semanaRef = null;

const ddmm = (iso) => {
  const d = deISODate(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
};

/** Ordem para quem entra na posição `indice` entre linhas com as ordens `ordens`. */
function ordemNaPosicao(ordens, indice) {
  if (!ordens.length) return 0;
  if (indice <= 0) return ordens[0] - 1;
  if (indice >= ordens.length) return ordens[ordens.length - 1] + 1;
  return (ordens[indice - 1] + ordens[indice]) / 2;
}

export async function renderTreinos(container) {
  container.appendChild(tituloVista("Treinos"));
  return renderSemana(container);
}

async function renderSemana(container) {
  const hoje = hojeISO();
  const pds = await primeiroDiaSemana();
  const atual = inicioDaSemana(hoje, pds);
  if (!semanaRef) semanaRef = atual;
  const r = await carregarSemana(semanaRef);

  const mudar = (dias) => { semanaRef = somarDias(semanaRef, dias); recarregar(); };
  const ehAtual = semanaRef === atual;
  container.appendChild(el("div", { class: "semana-nav" }, [
    botao("‹", { variante: "ghost", onClick: () => mudar(-7) }),
    el("span", { class: "strong", text: ehAtual ? "Esta semana" : `${ddmm(r.inicio)} a ${ddmm(r.fim)}` }),
    botao("›", { variante: "ghost", onClick: () => mudar(7) }),
  ]));
  if (!ehAtual) {
    container.appendChild(botao("Voltar para esta semana", { variante: "ghost", bloco: true, onClick: () => { semanaRef = atual; recarregar(); } }));
  }

  container.appendChild(cardResumoSemana(r, { titulo: `${ddmm(r.inicio)} a ${ddmm(r.fim)}` }));
  container.appendChild(el("p", { class: "dica-arrastar", text: "Segure um treino e arraste para outro dia ou período." }));

  // Cada dia tem uma vaga por período; as vazias só aparecem durante o arrasto.
  const arrastaveis = new Map();
  const semana = el("div", { class: "semana-dias" });
  for (const dia of r.dias) {
    const cab = `${nomeDiaSemana(dia.data)} · ${ddmm(dia.data)}${dia.data === hoje ? " · hoje" : ""}`;
    const vagas = Object.keys(ROTULO_PERIODO).map((periodo) => {
      const linhas = dia.entradas.filter((e) => e.periodo === periodo).map((e) => {
        const no = linhaEntrada(e, dia.data);
        no.dataset.ordem = String(e.ordem);
        if (podeMover(e)) arrastaveis.set(no, { entrada: e, data: dia.data });
        return no;
      });
      return el("div", {
        class: `slot${linhas.length ? "" : " slot--vazio"}`,
        dataset: { data: dia.data, periodo, rotulo: `Soltar aqui · ${ROTULO_PERIODO[periodo]}` },
      }, linhas);
    });
    semana.appendChild(el("section", { class: `card dia-card${dia.data === hoje ? " dia-card--hoje" : ""}` }, [
      el("p", { class: "eyebrow", text: cab }),
      dia.entradas.length ? null : el("p", { class: "sub dia-card__descanso", text: "Descanso." }),
      el("div", { class: "agenda-lista" }, vagas),
    ]));
  }
  container.appendChild(semana);

  ativarArrastar(semana, {
    linhas: arrastaveis,
    aoSoltar: async ({ contexto, data, periodo, indice, vizinhas }) => {
      const ordem = ordemNaPosicao(vizinhas.map((n) => Number(n.dataset.ordem)), indice);
      try {
        await moverEntrada(contexto.entrada, contexto.data, { data, periodo, ordem });
        toast(`Movido para ${nomeDiaSemana(data)} · ${ROTULO_PERIODO[periodo].toLowerCase()}`);
      } catch (e) {
        toast("Não foi possível mover: " + (e && e.message));
      }
      await recarregar();
    },
  });

  container.appendChild(el("div", { class: "lista-acoes" }, [
    botao("+ Treino fora da agenda", { bloco: true, onClick: () => sheetSessaoAvulsa(hoje) }),
    botao("Editar agenda semanal", { variante: "ghost", bloco: true, onClick: () => irPara("agenda") }),
  ]));
}
