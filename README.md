# PaceUp · Julia — treinos e nutrição

Versão do PaceUp para a Julia. Mostra, todo dia e em 1 ou 2 toques, dois números contra as metas que ela configura: **a semana de treinos** (com destaque para os treinos de perna e glúteo) e **a proteína do dia**, a partir do plano alimentar da nutricionista.

Uso diário no celular, **offline por completo**, **custo zero**, sem build e sem dependências. Roda **só no GitHub Pages**: os dados vivem no aparelho (IndexedDB) e o backup é um arquivo JSON. O app mostra números contra metas e nada além disso: **sem alertas clínicos, diagnósticos ou recomendações**.

---

## 1. O que muda em relação ao PaceUp original

É uma cópia independente do PaceUp (`cesar-pellito/treinos-corrida`). Mesma arquitetura, mesmo núcleo de dados e as mesmas regras de integridade; mudanças em um app não afetam o outro.

| | PaceUp (Cesar) | PaceUp · Julia |
|---|---|---|
| Corrida | plano de 22 semanas, registro, evolução, `.ics` | **sem corrida**: abre direto na tela Hoje |
| Atividades da agenda | musculação, karatê, corrida | **musculação** e **circo** |
| Destaque da semana | "Lower X de 2" | **"Perna e glúteo X de 3"** |
| Plano alimentar | o dele | o dela (mesma nutricionista e formato; porções diferentes, café com 2 alternativas) |
| Metas iniciais de proteína | 150–170 g | **100–130 g** (ponto de partida; ajuste em Ajustes → Metas) |
| Banco IndexedDB | `treinos-corrida` | `paceup-julia` |
| Cache do service worker | `treinos-corrida-*` | `paceup-julia-*` |
| Cor | verde-azulado | roxo |

Banco e cache têm nomes próprios porque os dois apps ficam na mesma origem (`cesar-pellito.github.io`): instalar os dois no mesmo celular não mistura dados nem apaga o cache um do outro.

O código da corrida que vive nas camadas `services/` e `data/` (pace, plano, `.ics`) continua no repositório para manter o núcleo e os testes iguais ao original, mas nenhuma tela o usa.

---

## 2. Arquitetura (resumo)

HTML + CSS + JavaScript vanilla com ES modules, sem build. Três camadas com dependência unidirecional:

```
views/      (DOM, eventos)         — não conhece IndexedDB nem regras
  ↓
services/   (regras, cálculos)     — não conhece DOM
  ↓
data/       (repository.js, db.js) — única a falar com IndexedDB
```

```
index.html · manifest.webmanifest · service-worker.js · test.html
assets/icons/                 ícones do PWA (icon.svg é a fonte)
styles/app.css                design system (tema claro/escuro)
js/
  app.js                      bootstrap: SW, tema, seed da agenda, roteamento
  data/  db.js repository.js seed.js seed-hub.js plano-alimentar.js
  services/  agenda metas nutricao dates backup theme (+ núcleo da corrida, sem uso)
  views/  router today treinos nutricao settings help agenda-editor metas-editor
          components/ ui.js agenda-ui.js nutricao-ui.js arrastar.js
  tests/ nucleo.js            asserções do núcleo (rodam em test.html)
```

**Agenda-padrão** (`js/data/seed-hub.js`, UUIDs fixos; editável em Ajustes → Agenda semanal):

| Dia | Manhã | Noite |
|---|---|---|
| Segunda | — | Circo — Aula |
| Terça | — | Musculação — Pernas forte |
| Quarta | — | Musculação — Superiores + cardio |
| Quinta | — | Musculação — Pernas + cardio |
| Sexta | — | Circo — Aula |
| Sábado | Musculação — Glúteos forte + cardio | — |
| Domingo | descanso | — |

**Definições usadas nos números:**
- **Previstos da semana:** itens não opcionais da agenda.
- **Aderência:** feitos ÷ previstos. Opcional feito e treino fora da agenda contam como *extra*; "pulado" aparece à parte.
- **Perna e glúteo:** sessões de musculação **feitas** com rótulo começando por "Pernas" ou "Glúteos", em qualquer dia.
- **Remanejamento:** um treino fora da agenda com o mesmo rótulo de um item da semana ainda não feito vale por aquele item (ex.: "Glúteos forte + cardio" no domingo em vez de sábado).
- **Proteína do dia:** soma de `macros.prot × porção` das refeições marcadas mais a proteína extra.

### Plano alimentar e estimativas
`js/data/plano-alimentar.js` traz o plano transcrito do PDF da nutricionista, com as quantidades literais. O PDF não informa macros: a tabela `MACROS` no fim do arquivo tem **estimativas** por refeição e variante, calculadas pela tabela TACO com uma escolha típica de cada grupo (a composição usada está no comentário). A interface sempre mostra o selo "estimativa". Para trocar de plano, edite esse arquivo e incremente `CACHE_VERSAO` no `service-worker.js`.

---

## 3. Publicar no GitHub Pages

O Pages gratuito só publica repositórios **públicos**. Os dados ficam no aparelho; o repositório só tem o código e o plano alimentar.

1. Crie o repositório **público** `paceup-julia` no GitHub, vazio.
2. Na raiz do projeto:
   ```bash
   git remote add origin https://github.com/cesar-pellito/paceup-julia.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`. Salve.
4. Em ~1 minuto o app fica em `https://cesar-pellito.github.io/paceup-julia/`.
5. Dali em diante, `git push` publica. Ao mudar qualquer arquivo, incremente `CACHE_VERSAO` em `service-worker.js` para o celular receber o aviso "Nova versão disponível".

### Rodar localmente
ES modules não abrem via `file://`. Na raiz: `npx serve` e abra `http://localhost:3000`.

---

## 4. Instalar no celular (Android)

1. No celular dela, abra `https://cesar-pellito.github.io/paceup-julia/` no **Chrome**.
2. Menu **⋮ → Instalar app** (ou **Adicionar à tela inicial → Instalar**).
3. Abra pelo ícone roxo do PaceUp. Funciona offline a partir daí.

Usar o app instalado reduz o risco de o navegador limpar os dados para liberar espaço. Mesmo assim, faça backup.

---

## 5. Backup

- **Exportar:** Ajustes → Exportar backup (JSON). O celular abre o compartilhar: salve no Google Drive.
- **Restaurar ou trocar de aparelho:** Ajustes → Importar backup (JSON). Merge por ID com last-write-wins: importar duas vezes não duplica.
- O app avisa quando o último backup passa de 14 dias.

---

## 6. Testes

Abra `test.html` servido por HTTP (`localhost`): roda as asserções do núcleo (datas, regras de integridade, migrações, backup, agenda, metas, plano alimentar, proteína do dia, arrastar na semana) e mostra ✓/✗.

> `test.html` apaga e recria o banco da origem em que roda. Rode em `localhost`, nunca na URL do GitHub Pages.
