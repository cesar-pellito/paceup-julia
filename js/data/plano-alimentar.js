// plano-alimentar.js — plano da nutricionista da Julia.
//
// Mesmo formato do PaceUp original (que veio do App_Dieta): blocos se somam,
// opções de um bloco são excludentes. Camada de dados estática: não fala com
// IndexedDB.

/**
 * PLANO — dados transcritos do PDF do plano alimentar da Julia.
 * Fonte: Dietnet — 08/07/2026 — Nutricionista Noemi Pasquali
 *
 * REGRAS DE MANUTENÇÃO:
 * - Quantidades são LITERAIS do PDF. Não arredondar, não padronizar.
 * - quantidade: null significa que o PDF não informa quantidade para o item.
 * - blocos se SOMAM entre si (+); opções dentro de um bloco são EXCLUDENTES (ou).
 * - Os blocos "CEREAIS E SEMENTES" vêm da OBSERVAÇÃO do PDF ("consumir a fruta
 *   com 20g de granola sem açúcar, ou aveia, ou linhaça, ou psyllium").
 */

export const PLANO = {
  versao: "08/07/2026",
  paciente: "Julia",
  nutricionista: {
    nome: "Noemi Pasquali",
    email: "noemi.borges@dietnet.com.br",
    instagram: "@nutri.noemi_pasquali",
    clinica: "Dietnet",
    instagramClinica: "@dietnet",
    endereco: "Rua Tabapuã, 500 Cj. 52 - Itaim Bibi - São Paulo – SP",
    telefone: "(11) 3582-0660",
    whatsapp: "(11) 99019-7794"
  },

  hidratacao: "Ingestão de 2,3 litros de água ao longo do dia, sempre nos intervalos das refeições e durante a atividade física.",

  refeicoes: [
    {
      id: "cafe",
      nome: "Café da Manhã",
      horarioSugerido: "até 10h",
      variantes: [
        {
          nome: "1ª Alternativa — Pão",
          blocos: [
            {
              grupo: "GRUPO DOS PÃES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Pão de forma", quantidade: "2 fatias" },
                { alimento: "Pão francês", quantidade: "1" },
                { alimento: "Bisnaguinhas", quantidade: "3" },
                { alimento: "Torradas (integral ou branco)", quantidade: "4" },
                { alimento: "Tapioca", quantidade: "40g" },
                { alimento: "Panquecas", quantidade: "1" }
              ]
            },
            {
              grupo: "GRUPO DAS CARNES ou LEITES E DERIVADOS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Queijo branco", quantidade: "2 fatias (50g)" },
                { alimento: "Frango desfiado", quantidade: "40g" },
                { alimento: "Atum", quantidade: "40g" },
                { alimento: "Creme de ricota (patê)", quantidade: "20g" },
                { alimento: "Ovos", quantidade: "2" }
              ]
            },
            {
              grupo: "CAFÉ COM LEITE",
              obrigatorio: false,
              opcoes: [
                { alimento: "Café com leite", quantidade: "1 xícara" }
              ]
            },
            {
              grupo: "AÇÚCAR / ADOÇANTE",
              obrigatorio: false,
              opcoes: [
                { alimento: "Açúcar", quantidade: "1 colher de chá" },
                { alimento: "Adoçante", quantidade: "3 gotas ou 1 sachê" }
              ]
            }
          ]
        },
        {
          nome: "2ª Alternativa — Fruta e whey",
          blocos: [
            {
              grupo: "GRUPO DAS FRUTAS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Fruta que gosta", quantidade: "100g" }
              ]
            },
            {
              grupo: "CEREAIS E SEMENTES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Granola sem açúcar", quantidade: "20g" },
                { alimento: "Aveia", quantidade: "20g" },
                { alimento: "Linhaça", quantidade: "20g" },
                { alimento: "Farinha de psyllium", quantidade: "20g" }
              ]
            },
            {
              grupo: "SUPLEMENTO",
              obrigatorio: true,
              opcoes: [
                { alimento: "Whey Protein", quantidade: "30g" }
              ]
            },
            {
              grupo: "GRUPO DE LEITES E DERIVADOS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Iogurte Desnatado", quantidade: "200 ml" },
                { alimento: "Leite", quantidade: "200 ml" },
                { alimento: "Iogurte proteico", quantidade: "01 unidade" }
              ]
            }
          ]
        }
      ],
      observacao: "Água: importante beber água ao longo do dia, não só no desjejum mas durante todo o dia; pode variar com água saborizada se desejar."
    },

    {
      id: "almoco",
      nome: "Almoço",
      horarioSugerido: "10h às 15h",
      variantes: [
        {
          nome: null,
          blocos: [
            {
              grupo: "GRUPO DE SALADA E LEGUMES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Salada crua e legumes cozidos ou refogados (temperar com vinagre-limão-azeite extravirgem)", quantidade: "Metade do prato" }
              ]
            },
            {
              grupo: "GRUPO DE ARROZ",
              obrigatorio: true,
              opcoes: [
                { alimento: "Arroz Integral", quantidade: "80g" },
                { alimento: "Arroz branco (sempre que possível acompanhado de uma leguminosa)", quantidade: "80g" },
                { alimento: "Macarrão", quantidade: "160g" },
                { alimento: "Batata", quantidade: "160g" },
                { alimento: "Mandioca", quantidade: "160g" }
              ]
            },
            {
              grupo: "GRUPO DAS LEGUMINOSAS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Feijão", quantidade: "100g" },
                { alimento: "Ervilha", quantidade: "100g" },
                { alimento: "Vagem", quantidade: "100g" },
                { alimento: "Grão de bico", quantidade: "100g" }
              ]
            },
            {
              grupo: "GRUPO DAS CARNES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Filé de frango ou sobrecoxa sem pele", quantidade: "100g" },
                { alimento: "Carne magra grelhada, cozida, assada ou refogada (filé mignon, alcatra, maminha, lagarto, músculo, patinho)", quantidade: "100g" },
                { alimento: "Peixes (sardinha, atum, arenque, anchova, salmão, truta, pescada branca, tilápia, saint peter)", quantidade: "180g" },
                { alimento: "Ovos", quantidade: "2" }
              ]
            },
            {
              grupo: "GRUPO DAS FRUTAS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Laranja", quantidade: "1" },
                { alimento: "Mexerica", quantidade: "1" },
                { alimento: "Abacaxi", quantidade: "1 fatia" }
              ]
            }
          ]
        }
      ],
      observacao: "Coma devagar e com atenção. Ao comer devagar, você mastiga mais vezes o alimento facilitando a digestão e dá tempo ao cérebro associar que você comeu, fazendo com que você passe a comer uma quantidade suficiente de alimentos."
    },

    {
      id: "lanche",
      nome: "Lanche da Tarde",
      horarioSugerido: "15h às 19h",
      variantes: [
        {
          nome: "1ª Alternativa",
          blocos: [
            {
              grupo: "GRUPO DOS PÃES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Tapioca", quantidade: "50 gramas" },
                { alimento: "Pão Francês", quantidade: "01 unidade" },
                { alimento: "Cuscuz", quantidade: "60 gramas" }
              ]
            },
            {
              grupo: "GRUPO DAS CARNES ou LEITES E DERIVADOS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Ovo Mexido", quantidade: "01 unidade" },
                { alimento: "Frango Desfiado", quantidade: "60 gramas" },
                { alimento: "Queijo Branco + suco de fruta", quantidade: "02 fatias médias" },
                { alimento: "Creme Cheese + suco de fruta", quantidade: null },
                { alimento: "Ricota + suco de fruta", quantidade: null },
                { alimento: "Cottage + suco de fruta", quantidade: "01 colher de sopa" }
              ]
            }
          ]
        },
        {
          nome: "2ª Alternativa — Vitamina ou fruta",
          blocos: [
            {
              grupo: "GRUPO DAS FRUTAS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Fruta", quantidade: "120 gramas" }
              ]
            },
            {
              grupo: "CEREAIS E SEMENTES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Aveia", quantidade: "20 gramas" },
                { alimento: "Chia", quantidade: "20 gramas" },
                { alimento: "Linhaça", quantidade: "20 gramas" },
                { alimento: "Granola sem açúcar", quantidade: "20 gramas" },
                { alimento: "Farinha de psyllium", quantidade: "20 gramas" }
              ]
            },
            {
              grupo: "SUPLEMENTO",
              obrigatorio: true,
              opcoes: [
                { alimento: "Whey Protein", quantidade: "30 gr (01 dose)" }
              ]
            },
            {
              grupo: "GRUPO DE LEITES E DERIVADOS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Iogurte Desnatado", quantidade: "200 ml" },
                { alimento: "Leite", quantidade: "200 ml" }
              ]
            }
          ]
        }
      ],
      observacao: "Consumir a fruta da sua preferência com 20g de granola sem açúcar, ou 20g de aveia, ou 20g de linhaça, ou 20g de farinha de psyllium."
    },

    {
      id: "jantar",
      nome: "Jantar",
      horarioSugerido: "a partir das 19h",
      variantes: [
        {
          nome: "Prato",
          blocos: [
            {
              grupo: "GRUPO DE SALADA E LEGUMES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Salada crua e legumes cozidos ou refogados (temperar com vinagre-limão-azeite extravirgem)", quantidade: "Metade do prato" }
              ]
            },
            {
              grupo: "GRUPO DE ARROZ",
              obrigatorio: true,
              opcoes: [
                { alimento: "Arroz Integral", quantidade: "80g" },
                { alimento: "Arroz branco (sempre que possível acompanhado de uma leguminosa)", quantidade: "80g" },
                { alimento: "Macarrão", quantidade: "160g" },
                { alimento: "Batata", quantidade: "160g" },
                { alimento: "Mandioca", quantidade: "160g" }
              ]
            },
            {
              grupo: "GRUPO DAS LEGUMINOSAS",
              obrigatorio: true,
              opcoes: [
                { alimento: "Feijão", quantidade: "100g" },
                { alimento: "Ervilha", quantidade: "100g" },
                { alimento: "Vagem", quantidade: "100g" },
                { alimento: "Grão de bico", quantidade: "100g" }
              ]
            },
            {
              grupo: "GRUPO DAS CARNES",
              obrigatorio: true,
              opcoes: [
                { alimento: "Filé de frango ou sobrecoxa sem pele", quantidade: "100g" },
                { alimento: "Carne magra grelhada, cozida, assada ou refogada (filé mignon, alcatra, maminha, lagarto, músculo, patinho)", quantidade: "100g" },
                { alimento: "Peixes (sardinha, atum, arenque, anchova, salmão, truta, pescada branca, tilápia, saint peter)", quantidade: "180g" },
                { alimento: "Ovos", quantidade: "2" }
              ]
            }
          ]
        },
        {
          nome: "Sanduíche",
          blocos: [
            {
              grupo: "PÃO",
              obrigatorio: true,
              opcoes: [
                { alimento: "Pão francês", quantidade: "1" },
                { alimento: "Pão de forma", quantidade: "2 fatias" },
                { alimento: "Pão de hambúrguer", quantidade: "1" },
                { alimento: "Pão sírio", quantidade: "1" },
                { alimento: "Tapioca", quantidade: "60g" },
                { alimento: "Cuscuz", quantidade: "100g" }
              ]
            },
            {
              grupo: "PROTEÍNA",
              obrigatorio: true,
              opcoes: [
                { alimento: "Hambúrguer caseiro + 2 fatias de mussarela", quantidade: "100g" },
                { alimento: "Frango desfiado + 20g de requeijão light", quantidade: "100g" },
                { alimento: "Carne magra moída ou assada/fatiada + 2 fatias de mussarela", quantidade: "100g" },
                { alimento: "Ovos", quantidade: "2" }
              ]
            },
            {
              grupo: "ACOMPANHAMENTO",
              obrigatorio: true,
              opcoes: [
                { alimento: "Folhas e legumes que você gosta", quantidade: "1 prato de sobremesa cheio" }
              ]
            }
          ]
        }
      ],
      observacao: null
    }
  ],

  substituicoes: {
    "GRUPO DOS PÃES – 1 porção": [
      { alimento: "Pão francês", medida: "1und" },
      { alimento: "Pão Integral", medida: "2 fatias" },
      { alimento: "Biscoito Polvilho", medida: "8 und" },
      { alimento: "Pão de forma", medida: "2 fatias" },
      { alimento: "Torrada tipo Bauducco", medida: "3und" },
      { alimento: "Pão de Queijo Mini", medida: "4 unidades" },
      { alimento: "Pão de aveia", medida: "2 fatias" },
      { alimento: "Torrada Caseira", medida: "3und" },
      { alimento: "Sucrilhos Integral", medida: "6csopa" },
      { alimento: "Bisnaguinha", medida: "2und" },
      { alimento: "Bolacha água e sal", medida: "4und" },
      { alimento: "Barra de cereal", medida: "1und" },
      { alimento: "Wrap Integral", medida: "1und" },
      { alimento: "Goma de Tapioca", medida: "3csopa" },
      { alimento: "Sírio", medida: "1und" }
    ],

    "GRUPO DO LEITE E DERIVADOS – 1 porção": [
      { alimento: "Leite desnatado", medida: "200 ml" },
      { alimento: "Leite Fermentado", medida: "1und" },
      { alimento: "Leite em pó desnatado", medida: "1csopa" },
      { alimento: "Leite Semi Desnatado", medida: "200 ml" },
      { alimento: "Queijo mussarela", medida: "2 fatias" },
      { alimento: "Creme de ricota", medida: "1csopa" },
      { alimento: "Queijo minas light", medida: "2 fatias" },
      { alimento: "Ricota fresca", medida: "2 fatias" },
      { alimento: "Iogurte natural", medida: "200 ml" },
      { alimento: "Requeijão light", medida: "1csopa" }
    ],

    "GRUPO DAS FRUTAS – gramas indicada no plano alimentar": [
      { alimento: "Mamão formosa", medida: null },
      { alimento: "Pera", medida: null },
      { alimento: "Melancia", medida: null },
      { alimento: "Laranja", medida: null },
      { alimento: "Figo", medida: null },
      { alimento: "Manga", medida: null },
      { alimento: "Melão", medida: null },
      { alimento: "Abacaxi", medida: null },
      { alimento: "Morango", medida: null },
      { alimento: "Banana", medida: null },
      { alimento: "Goiaba", medida: null },
      { alimento: "Maracujá", medida: null },
      { alimento: "Maçã", medida: null },
      { alimento: "Ameixa vermelha", medida: null },
      { alimento: "Caqui", medida: null },
      { alimento: "Acerola", medida: null },
      { alimento: "Pitanga", medida: null },
      { alimento: "Caju", medida: null },
      { alimento: "Salada de Frutas", medida: null },
      { alimento: "Suco de frutas", medida: "120ml" },
      { alimento: "Abacate", medida: null },
      { alimento: "Carambola", medida: null },
      { alimento: "Mexerica", medida: null },
      { alimento: "Cereja", medida: null },
      { alimento: "Lichia", medida: null },
      { alimento: "Uvas", medida: null }
    ],

    "GRUPO DE ARROZ – gramas indicada no plano alimentar": [
      { alimento: "Arroz branco", medida: null },
      { alimento: "Macarrão branco", medida: null },
      { alimento: "Mandioca", medida: null },
      { alimento: "Arroz Integral", medida: null },
      { alimento: "Macarrão Integral", medida: null },
      { alimento: "Milho verde", medida: null },
      { alimento: "Arroz risoto", medida: null },
      { alimento: "Batata doce", medida: null },
      { alimento: "Panqueca", medida: null },
      { alimento: "Batata Inglesa", medida: null },
      { alimento: "Salada de Maionese", medida: null },
      { alimento: "Polenta", medida: null }
    ],

    "GRUPO DAS PROTEÍNAS – gramas indicada no plano alimentar": [
      { alimento: "Bife grelhado", medida: null },
      { alimento: "Sobrecoxa sem pele", medida: null },
      { alimento: "Sardinha em lata", medida: null },
      { alimento: "Fígado grelhado", medida: null },
      { alimento: "Peito de frango", medida: null },
      { alimento: "Carne moída", medida: null },
      { alimento: "Coxa de Frango", medida: null },
      { alimento: "Coração de frango", medida: null },
      { alimento: "Ovo cozido", medida: null },
      { alimento: "Ovo Pochê", medida: null },
      { alimento: "Hambúrguer caseiro", medida: null },
      { alimento: "Atum in natura", medida: null },
      { alimento: "Filé pescada", medida: null },
      { alimento: "Almôndegas caseiras", medida: null }
    ],

    "GRUPO DOS LEGUMES – à vontade ou metade do prato": [
      { alimento: "Cenoura cozida", medida: null },
      { alimento: "Beterraba cozida", medida: null },
      { alimento: "Abóbora cozida", medida: null },
      { alimento: "Quiabo cozido", medida: null },
      { alimento: "Abobrinha cozida", medida: null },
      { alimento: "Berinjela cozida", medida: null },
      { alimento: "Brócolis cozido", medida: null },
      { alimento: "Vagem cozida", medida: null },
      { alimento: "Chuchu cozido", medida: null },
      { alimento: "Couve-flor cozida", medida: null },
      { alimento: "Couve manteiga refogada", medida: null }
    ],

    "BEBIDA VEGETAL / QUEIJO VEGANO": [
      { alimento: "Bebida vegetal de amêndoas", medida: "200 ml / 01 copo de requeijão" },
      { alimento: "Queijo Vegano", medida: "60 g / 02 fatias médias" },
      { alimento: "Bebida vegetal de arroz", medida: "200 ml / 01 copo de requeijão" },
      { alimento: "Bebida vegetal de soja", medida: "200 ml / 01 copo de requeijão" },
      { alimento: "Bebida vegetal de cereais", medida: "200 ml / 01 copo de requeijão" },
      { alimento: "Iogurte Vegetal", medida: "200 ml / 01 unidade" },
      { alimento: "Bebida vegetal de coco", medida: "200 ml / 01 copo de requeijão" }
    ],

    "OPÇÕES DE DOCES": [
      { alimento: "Frutas Secas", medida: "20 gramas" },
      { alimento: "Gelatina", medida: "200 ml" },
      { alimento: "Banana com canela no microondas", medida: null },
      { alimento: "Chocolate 70% cacau", medida: null },
      { alimento: "Doces da Flormel", medida: null }
    ]
  },

  notasSubstituicoes: {
    "GRUPO DE ARROZ – gramas indicada no plano alimentar":
      "Dar preferência aos integrais.",
    "GRUPO DAS PROTEÍNAS – gramas indicada no plano alimentar":
      "Tirar a gordura aparente das proteínas antes do preparo, evitar as frituras, dar preferência às preparações assadas, grelhadas ou cozidas, usar pouco óleo e evitar o uso de temperos prontos."
  },

  refeicaoLivre: "Planeje sua refeição livre: você tem 4 a 6 refeições livres no mês, para consumir alimentos que gosta muito, como por exemplo pastel, pizza (até 3 pedaços), churrasco, doce. Escolha em qual refeição você irá comer algum desses alimentos: café da manhã, almoço, lanche ou jantar. Em seguida, retome o planejamento.",

  orientacoes: [
    "Pese os alimentos prontos para ter certeza da quantidade ingerida.",
    "Faça suas refeições de forma tranquila, de preferência sentada à mesa, sem distrações (celular, TV).",
    "Comer devagar e mastigar bem os alimentos.",
    "Fazer 5 a 6 refeições/dia, respeitando os horários. Evitar pular refeições.",
    "Combine os alimentos, procurando não misturar dois tipos de carboidratos na mesma refeição.",
    "Evitar beliscar ou petiscar alimentos fora do plano alimentar.",
    "Começar as refeições preferencialmente com saladas cruas ou frutas.",
    "Preferir os óleos vegetais.",
    "Dar preferência às carnes brancas e magras, evitando a pele de frango e peixe.",
    "Usar queijos magros (ricota, minas, quark, requeijão light), leite e iogurtes desnatados.",
    "Evitar: banha, toucinho, bacon, embutidos em geral (esses contêm, além de gordura, muito sal).",
    "Substituir os doces e sobremesas por frutas.",
    "Consumir fibras, ingerindo frutas e verduras cruas, cereais integrais (pão de centeio, arroz integral, aveia, farelos de trigo e aveia).",
    "Aumentar a ingestão de líquidos, principalmente água e sucos naturais (como laranja, acerola, abacaxi, caju, limão, mexerica, morango) e chás.",
    "Na última refeição do dia dê preferência a alimentos mais leves.",
    "Evitar o excesso de sal e principalmente o saleiro de mesa.",
    "Ler os rótulos dos alimentos.",
    "Manter atividade física regular."
  ],

  links: [
    { nome: "Dux Nutrition (whey protein)", url: "https://www.duxnutrition.com/", cupom: "PACNOEMIPASQUALI", desconto: "20%" },
    { nome: "Vitafor (whey protein)", url: "https://www.vitafor.com.br/", cupom: null, desconto: null },
    { nome: "Panelinha Fit (marmitas fitness)", url: "https://panelinhafit.com.br/", cupom: "pasquali20", desconto: "20% em todo o site, menos kits de marmitas" }
  ],

  mensagemAbertura: "Esse processo é uma caminhada e não uma corrida, portanto tenha calma que os resultados estão por vir e estamos juntos nesta jornada."
};

/*
 * Estimativas de macros por refeição — e por variante, na ordem em que as
 * variantes aparecem no plano. Calculadas pela tabela TACO a partir dos
 * alimentos do plano (escolha "típica" em cada grupo; nas carnes, a média de
 * frango e carne magra). São APROXIMAÇÕES, não valores oficiais da
 * nutricionista. gord = gordura; valores em gramas; kcal arredondado.
 *
 *   café 1ª   pão de forma 2 fatias + queijo branco 50g + café com leite + 1 col. chá de açúcar
 *   café 2ª   fruta 100g + aveia 20g + whey 30g + iogurte desnatado 200 ml
 *   almoço    salada com 1 col. chá de azeite + arroz 80g + feijão 100g + carne 100g + laranja
 *   lanche 1ª pão francês/tapioca + ovo, frango 60g ou queijo branco (média)
 *   lanche 2ª fruta 120g + aveia 20g + whey 30g + iogurte desnatado 200 ml
 *   jantar    o almoço sem a fruta
 *   sanduíche pão francês + hambúrguer caseiro 100g com mussarela ou frango com requeijão (média) + folhas
 */
export const MACROS = {
  cafe:   [{ kcal: 310, prot: 16, carb: 35, gord: 12 },
           { kcal: 345, prot: 35, carb: 44, gord: 4 }],
  almoco: [{ kcal: 490, prot: 40, carb: 60, gord: 10 }],
  lanche: [{ kcal: 250, prot: 11, carb: 33, gord: 6 },
           { kcal: 360, prot: 36, carb: 47, gord: 4 }],
  jantar: [{ kcal: 430, prot: 40, carb: 45, gord: 10 },
           { kcal: 450, prot: 34, carb: 35, gord: 17 }]
};

export const ROTULO_CURTO = {
  cafe:   "Café",
  almoco: "Almoço",
  lanche: "Lanche",
  jantar: "Jantar"
};

export const ROTULO_HORA = {
  cafe:   "até 10h",
  almoco: "10–15h",
  lanche: "15–19h",
  jantar: "19h+"
};
