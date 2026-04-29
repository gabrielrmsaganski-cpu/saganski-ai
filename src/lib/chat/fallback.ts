type Msg = { role: "user" | "assistant" | "system"; content: string };

const sectorMap: Array<{ keys: string[]; sector: string; modules: string[] }> = [
  {
    keys: ["vendas", "comercial", "leads", "funil", "crm"],
    sector: "Comercial",
    modules: [
      "CRM com etapas próprias",
      "Captura automática de leads",
      "Geração de propostas",
      "Painel de pipeline e conversão",
    ],
  },
  {
    keys: ["rh", "pessoas", "admissão", "admissao", "ponto", "férias", "ferias"],
    sector: "RH",
    modules: [
      "Onboarding digital com assinaturas",
      "Repositório de documentos com OCR",
      "Avaliações e PDIs estruturados",
      "Indicadores de pessoas",
    ],
  },
  {
    keys: ["financeiro", "caixa", "contas", "boleto", "pix", "cobrança", "cobranca"],
    sector: "Financeiro",
    modules: [
      "Contas a pagar e receber com aprovações",
      "Conciliação bancária",
      "Régua de cobrança multicanal",
      "Fluxo de caixa projetado",
    ],
  },
  {
    keys: ["jurídico", "juridico", "processos", "contratos", "audiência", "audiencia"],
    sector: "Jurídico",
    modules: [
      "Captura automática de andamentos",
      "Resumo de peças com IA",
      "Geração e versionamento de contratos",
      "Provisão de risco assistida",
    ],
  },
  {
    keys: ["logística", "logistica", "frota", "estoque", "expedição", "expedicao"],
    sector: "Logística",
    modules: [
      "Painel de pedidos ponta a ponta",
      "Estoque em tempo real",
      "App de motorista com checklist",
      "Notificações automáticas ao cliente",
    ],
  },
  {
    keys: ["agro", "fazenda", "talhão", "talhao", "safra", "ambiental", "car"],
    sector: "Agronegócio",
    modules: [
      "Cadastro de fazendas, talhões e safras",
      "Documentação ambiental centralizada",
      "Controle de insumos, máquinas e equipe",
      "Painel por safra/cultura",
    ],
  },
  {
    keys: ["atendimento", "suporte", "help", "ticket", "whatsapp"],
    sector: "Atendimento",
    modules: [
      "Atendimento omnichannel unificado",
      "IA assistente do operador",
      "Visão 360º do cliente",
      "Pesquisa de satisfação automatizada",
    ],
  },
  {
    keys: ["prospecção", "prospeccao", "outbound", "captação", "captacao"],
    sector: "Prospecção",
    modules: [
      "Captura e enriquecimento de empresas",
      "Score de potencial",
      "Cadência multicanal",
      "Painel de cobertura",
    ],
  },
];

const documentSignals = [
  "documento",
  "contrato",
  "pdf",
  "laudo",
  "ocr",
  "extrair",
];
const dashSignals = ["painel", "dashboard", "indicador", "kpi", "bi"];
const integrationSignals = [
  "erp",
  "api",
  "integração",
  "integracao",
  "sap",
  "totvs",
  "omie",
  "openfin",
];
const aiSignals = ["ia", "agente", "automação", "automacao", "rpa"];

export function buildFallbackReply(history: Msg[]): string {
  const userMessages = history.filter((m) => m.role === "user");
  const last = userMessages.at(-1)?.content?.toLowerCase() ?? "";
  const conversation = userMessages.map((m) => m.content).join(" ").toLowerCase();

  if (userMessages.length <= 1 && last.length < 6) {
    return [
      "Olá. Sou o Consultor SAGANSKI AI.",
      "Para começar o diagnóstico, me conta:",
      "1. Qual o setor ou área da empresa?",
      "2. Qual processo manual mais consome o tempo do seu time hoje?",
      "Pode responder em texto livre — eu organizo aqui.",
    ].join("\n\n");
  }

  const sectorMatch = sectorMap.find((s) =>
    s.keys.some((k) => conversation.includes(k))
  );

  const flags = {
    docs: documentSignals.some((s) => conversation.includes(s)),
    dash: dashSignals.some((s) => conversation.includes(s)),
    integ: integrationSignals.some((s) => conversation.includes(s)),
    ai: aiSignals.some((s) => conversation.includes(s)),
  };

  const collected = sectorMatch ? sectorMatch.sector : "ainda não identificado";

  const lines: string[] = [];

  if (sectorMatch) {
    lines.push(
      `Pelo que você descreveu, parece um caso de **${sectorMatch.sector}**.`
    );
    lines.push("\nMódulos que costumamos sugerir nesse cenário:");
    sectorMatch.modules.forEach((m) => lines.push(`- ${m}`));
  } else {
    lines.push(
      "Para sugerir os módulos certos, preciso entender o setor e o processo principal afetado."
    );
    lines.push(
      "Me responda em uma frase: qual é a área (comercial, RH, financeiro, jurídico, logística, atendimento, operações etc.) e o que está hoje em planilha ou WhatsApp?"
    );
  }

  if (flags.docs) {
    lines.push(
      "\nVocê citou documentos. Recomendamos avaliar OCR + automação documental para reduzir preenchimento manual e padronizar layouts oficiais."
    );
  }
  if (flags.dash) {
    lines.push(
      "\nSobre painéis: o ideal é conectar diretamente às fontes (ERP, banco, CRM) e desenhar visões por papel — diretoria vê meta, operação vê fila."
    );
  }
  if (flags.integ) {
    lines.push(
      "\nIntegrações dependem de API documentada e credenciais. Validamos isso no diagnóstico antes de qualquer compromisso de prazo."
    );
  }
  if (flags.ai) {
    lines.push(
      "\nIA aplicada faz sentido em três frentes: triagem (classificação automática), geração (textos/contratos) e decisão (recomendação com regras)."
    );
  }

  lines.push("\n---");
  lines.push("**Próximo passo recomendado**");
  lines.push(
    `- Setor identificado: ${collected}\n- Forneça volume mensal aproximado (clientes, documentos ou tickets) para refinarmos\n- Em seguida, gero um resumo do projeto com módulos, dados necessários e integrações`
  );

  lines.push(
    "\nDica: Esta resposta veio do modo offline (sem chave de IA configurada). Configure `OPENAI_API_KEY` no `.env.local` para conversar com o consultor com modelo completo."
  );

  return lines.join("\n");
}
