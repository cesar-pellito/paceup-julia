// settings.js — Ajustes: agenda, metas, tema, backup JSON, importar e ajuda.

import * as repo from "../data/repository.js";
import { irPara } from "./router.js";
import { exportarBackup, importarBackupTexto, estadoBackup } from "../services/backup.js";
import { aplicarTema } from "../services/theme.js";
import { el, card, botao, campo, tituloVista, seletorBotoes, toast } from "./components/ui.js";

export async function renderAjustes(container) {
  container.appendChild(tituloVista("Ajustes"));
  const cfg = await repo.obterConfigs();
  const backupSt = await estadoBackup();

  // ---- Hub: agenda e metas ----
  container.appendChild(
    card([
      el("p", { class: "eyebrow", text: "Semana e metas" }),
      el("div", { class: "lista-acoes" }, [
        botao("Agenda semanal", { bloco: true, onClick: () => irPara("agenda") }),
        botao("Metas", { bloco: true, onClick: () => irPara("metas") }),
      ]),
    ])
  );

  // ---- Tema (salva ao tocar) ----
  const tema = seletorBotoes(
    [{ valor: "auto", rotulo: "Automático" }, { valor: "claro", rotulo: "Claro" }, { valor: "escuro", rotulo: "Escuro" }],
    { valorInicial: cfg.temaEscuro || "auto", onChange: (v) => { aplicarTema(v); repo.definirConfig("temaEscuro", v); } }
  );
  container.appendChild(card([el("p", { class: "eyebrow", text: "Aparência" }), campo("Tema", tema.node)]));

  // ---- Backup ----
  container.appendChild(
    card([
      el("p", { class: "eyebrow", text: "Backup" }),
      el("p", { class: "sub", text: "Seus dados ficam só neste aparelho. O backup é um arquivo JSON: ao exportar, o celular abre o menu de compartilhar — salve no Google Drive. Para restaurar (ou passar para outro aparelho), use “Importar backup”: o que já existe não duplica." }),
      el("p", {
        class: backupSt.vencido ? "aviso" : "sub",
        style: backupSt.vencido ? { background: "var(--warn-weak)", color: "var(--warn)", padding: "10px 12px", borderRadius: "10px" } : {},
        text: backupSt.nunca ? "Você ainda não fez backup. Faça um agora." : `Último backup há ${backupSt.dias} ${backupSt.dias === 1 ? "dia" : "dias"}.${backupSt.vencido ? " Faça um novo." : ""}`,
      }),
      el("div", { class: "lista-acoes" }, [
        botao("Exportar backup (JSON)", {
          variante: "primary", bloco: true, onClick: async () => {
            try { const r = await exportarBackup(); if (r.metodo !== "cancelado") toast("Backup exportado."); }
            catch (e) { toast("Falha no backup: " + e.message); }
          },
        }),
        botaoImportar(),
      ]),
    ])
  );

  container.appendChild(botao("Ajuda", { bloco: true, onClick: () => irPara("ajuda") }));
}

function botaoImportar() {
  const input = el("input", { type: "file", accept: "application/json,.json", style: { display: "none" } });
  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const texto = await file.text();
      const rel = await importarBackupTexto(texto);
      toast(`Importado: ${rel.criados} criados, ${rel.atualizados} atualizados, ${rel.ignorados} ignorados.`);
      irPara("hoje");
    } catch (e) { toast("Falha ao importar: " + e.message); }
    input.value = "";
  });
  const b = botao("Importar backup (JSON)", { bloco: true, onClick: () => input.click() });
  const wrap = el("div", {}, [b, input]);
  return wrap;
}
