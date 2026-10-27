// help.js — como o app funciona e como não perder os dados.

import { voltar } from "./router.js";
import { el, card, cabecalhoVoltar } from "./components/ui.js";

export async function renderAjuda(container) {
  container.appendChild(cabecalhoVoltar("Ajuda", voltar));

  container.appendChild(
    card([
      el("div", { class: "ajuda-doc stack" }, [
        el("h3", { text: "Treinos" }),
        el("p", { text: "Na tela Hoje (e em Treinos) cada treino tem três botões: ✓ feito, ✕ não feito e ↷ pulado. Tocar de novo desmarca. Tocar no nome do treino abre duração e RPE, se quiser anotar." }),
        el("p", { text: "Em Treinos dá para segurar um treino e arrastar para outro dia ou período da mesma semana. Isso vale só para aquela semana; a agenda-padrão muda em Ajustes → Agenda semanal." }),
        el("p", { text: "“Perna e glúteo” conta a musculação feita com rótulo começando por “Pernas” ou “Glúteos”, em qualquer dia. A meta fica em Ajustes → Metas." }),

        el("h3", { text: "Nutrição" }),
        el("p", { text: "Marque cada refeição com ✓ quando fizer. A proteína do dia soma as refeições marcadas e a proteína extra. Os valores de cada refeição são estimativas feitas a partir da tabela TACO, não números da nutricionista." }),

        el("h3", { text: "Seus dados" }),
        el("p", { text: "Tudo fica salvo só no seu celular — o app não tem servidor. Para não perder nada: use o app instalado na tela inicial e exporte o backup JSON de vez em quando, salvando no Google Drive pelo menu de compartilhar. O app avisa quando o último backup passa de 14 dias." }),
      ]),
    ])
  );
}
