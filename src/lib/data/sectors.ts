import {
  Briefcase,
  Building2,
  ClipboardList,
  Headphones,
  HeartHandshake,
  Landmark,
  PhoneCall,
  Scale,
  Sprout,
  Target,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Sector = {
  id: string;
  name: string;
  icon: LucideIcon;
  pains: string[];
  solutions: string[];
  automations: string[];
  exampleSystem: string;
};

export const sectors: Sector[] = [
  {
    id: "comercial",
    name: "Comercial",
    icon: Target,
    pains: [
      "Funil em planilha, sem rastreabilidade",
      "Leads esquecidos no WhatsApp",
      "Propostas refeitas do zero a cada cliente",
      "Falta de visão de pipeline e previsão",
    ],
    solutions: [
      "CRM com etapas próprias e regras de avanço",
      "Captura automática de leads de site, formulário e WhatsApp",
      "Gerador de propostas a partir de templates",
      "Dashboards de pipeline, conversão e ramp-up",
    ],
    automations: [
      "Atribuição automática por SLA",
      "Follow-up programado",
      "Enriquecimento de empresa via APIs públicas",
      "Alerta de oportunidade fria",
    ],
    exampleSystem:
      "CRM personalizado integrado ao site, WhatsApp Business e e-mail, com proposta gerada em 1 clique e painel diário do diretor comercial.",
  },
  {
    id: "rh",
    name: "RH",
    icon: HeartHandshake,
    pains: [
      "Admissão lenta e cheia de papel",
      "Documentos espalhados por pasta e e-mail",
      "Falta de histórico de avaliações e PDIs",
      "Dificuldade em medir clima e turnover",
    ],
    solutions: [
      "Onboarding digital com checklist e assinaturas",
      "Repositório central de documentos com OCR",
      "Avaliações e feedbacks estruturados",
      "Indicadores de pessoas e jornada do colaborador",
    ],
    automations: [
      "Coleta de documentos do candidato",
      "Geração automática de contrato",
      "Lembretes de exames, férias e treinamentos",
      "Pesquisa de clima recorrente",
    ],
    exampleSystem:
      "Plataforma de RH sob medida com admissão 100% digital, jornada do colaborador e dashboard de pessoas para a diretoria.",
  },
  {
    id: "financeiro",
    name: "Financeiro",
    icon: Landmark,
    pains: [
      "Conciliação manual entre banco e ERP",
      "Cobranças perdidas",
      "Falta de previsibilidade de caixa",
      "Aprovações por e-mail e WhatsApp",
    ],
    solutions: [
      "Contas a pagar/receber com aprovações em fluxo",
      "Conciliação automática via Open Finance ou OFX",
      "Régua de cobrança multi-canal",
      "Fluxo de caixa projetado em tempo real",
    ],
    automations: [
      "Boleto e PIX automáticos",
      "Lembrete de vencimento e atraso",
      "Aprovação por alçada com auditoria",
      "Importação automática de extratos",
    ],
    exampleSystem:
      "Sistema financeiro integrado ao ERP existente com painel de caixa, régua de cobrança automática e portal de aprovações para diretoria.",
  },
  {
    id: "juridico",
    name: "Jurídico",
    icon: Scale,
    pains: [
      "Prazos controlados em planilha",
      "Análise manual de processos",
      "Contratos refeitos no Word",
      "Provisão imprecisa de risco",
    ],
    solutions: [
      "Captura automática de andamentos processuais",
      "Análise inicial de peças com IA",
      "Geração e versionamento de contratos",
      "Provisão e classificação de risco assistida",
    ],
    automations: [
      "Alertas de prazos e audiências",
      "Resumo automático de processos",
      "Triagem de petições recebidas",
      "Distribuição interna por área",
    ],
    exampleSystem:
      "Plataforma jurídica que centraliza processos, contratos e prazos, com IA para resumir peças e priorizar urgências.",
  },
  {
    id: "logistica",
    name: "Logística",
    icon: Truck,
    pains: [
      "Pedidos sem rastreabilidade",
      "Estoque desencontrado",
      "Roteirização feita à mão",
      "Comunicação solta com motoristas",
    ],
    solutions: [
      "Painel de pedidos do recebimento à entrega",
      "Estoque em tempo real conectado ao ERP",
      "Roteirização e ocorrências por motorista",
      "App leve para campo com checklist",
    ],
    automations: [
      "Atualização automática de status",
      "Alertas de exceção e atraso",
      "Reposição automática de estoque crítico",
      "Notificação ao cliente final",
    ],
    exampleSystem:
      "Painel logístico com tracking ponta a ponta, app de motorista e relatórios diários por filial.",
  },
  {
    id: "agronegocio",
    name: "Agronegócio",
    icon: Sprout,
    pains: [
      "Dados de campo em cadernos e planilhas",
      "Documentação ambiental dispersa",
      "Falta de visão por talhão e safra",
      "Custos operacionais sem rastreio",
    ],
    solutions: [
      "Cadastro de propriedades, talhões e safras",
      "Controle de insumos, máquinas e equipe",
      "Repositório de documentação ambiental e fundiária",
      "Painel por fazenda, cultura e período",
    ],
    automations: [
      "Importação de dados de máquinas e sensores",
      "Lembretes de manejo e janela de plantio",
      "Geração de relatórios para auditoria e crédito",
      "Alertas de prazo ambiental",
    ],
    exampleSystem:
      "Sistema agro sob medida com cadastro de fazendas, controle por safra/talhão, documentação ambiental e painel para o gestor.",
  },
  {
    id: "escritorios-administrativos",
    name: "Escritórios administrativos",
    icon: Building2,
    pains: [
      "Demandas misturadas entre setores",
      "Documentos físicos e digitais desorganizados",
      "Tarefas recorrentes feitas manualmente",
      "Pouca padronização de processos",
    ],
    solutions: [
      "Sistema de demandas internas com fluxos próprios",
      "Repositório central com versionamento",
      "Templates e checklists por tipo de tarefa",
      "Painel de produtividade por área",
    ],
    automations: [
      "Distribuição de tarefas por regra",
      "Lembretes e SLAs por demanda",
      "Geração automática de relatórios mensais",
      "Captura de e-mails como chamados",
    ],
    exampleSystem:
      "Plataforma administrativa unificada para protocolar, encaminhar e acompanhar demandas entre setores, com SLA e auditoria.",
  },
  {
    id: "cobranca",
    name: "Cobrança",
    icon: PhoneCall,
    pains: [
      "Cadência manual e desigual",
      "Sem visibilidade do que foi tentado",
      "Promessas de pagamento perdidas",
      "Falta de segmentação por perfil",
    ],
    solutions: [
      "Régua multicanal (WhatsApp, e-mail, SMS, ligação)",
      "Histórico unificado por cliente",
      "Acordos e parcelamentos com aprovação",
      "Segmentação por idade da dívida e perfil",
    ],
    automations: [
      "Disparo automático por etapa",
      "Geração automática de boleto/PIX",
      "Escalonamento por prazo",
      "Predição de propensão de pagamento",
    ],
    exampleSystem:
      "Plataforma de cobrança com régua automática multicanal, histórico unificado e painel para gestor da operação.",
  },
  {
    id: "atendimento",
    name: "Atendimento",
    icon: Headphones,
    pains: [
      "Vários canais sem unificação",
      "Tempo de primeira resposta alto",
      "Sem histórico de cliente entre operadores",
      "Falta de medição de satisfação",
    ],
    solutions: [
      "Atendimento omnichannel unificado",
      "Macros, IA assistente e respostas guiadas",
      "Visão 360º do cliente",
      "Pesquisa de satisfação automatizada",
    ],
    automations: [
      "Roteamento por fila e habilidade",
      "Sugestão de resposta com IA",
      "Encerramento e classificação automáticos",
      "Disparo de NPS pós-atendimento",
    ],
    exampleSystem:
      "Central de atendimento sob medida com WhatsApp, chat do site e e-mail unificados, IA auxiliando o operador e painel da liderança.",
  },
  {
    id: "diretoria",
    name: "Diretoria",
    icon: Briefcase,
    pains: [
      "Indicadores chegam tarde",
      "Cada área usa um número diferente",
      "Reuniões sem dado consolidado",
      "Relatórios feitos manualmente",
    ],
    solutions: [
      "Painel executivo único e em tempo real",
      "Indicadores conectados às operações reais",
      "Comparativo de meta vs. realizado por área",
      "Histórico para tomada de decisão",
    ],
    automations: [
      "Atualização automática dos KPIs",
      "Alertas de desvio de meta",
      "Resumo executivo gerado por IA",
      "Distribuição automática por e-mail/WhatsApp",
    ],
    exampleSystem:
      "Painel executivo conectado a CRM, ERP e operações, com resumo diário gerado por IA para a diretoria.",
  },
  {
    id: "operacoes",
    name: "Operações",
    icon: ClipboardList,
    pains: [
      "Processos não padronizados",
      "Indicadores frágeis",
      "Falta de checklists e auditoria",
      "Transferência de turno informal",
    ],
    solutions: [
      "Mapa de processos digitalizado",
      "Checklists eletrônicos por etapa",
      "Indicadores de produtividade e exceções",
      "Trocas de turno com handoff estruturado",
    ],
    automations: [
      "Captura de dados em campo",
      "Alertas de exceção em tempo real",
      "Integração com sensores e leitores",
      "Geração de relatórios operacionais",
    ],
    exampleSystem:
      "Sistema operacional sob medida com checklist eletrônico, painel de exceções e indicadores por turno.",
  },
  {
    id: "prospeccao",
    name: "Prospecção",
    icon: Users,
    pains: [
      "Bases públicas dispersas",
      "Listas frias sem qualificação",
      "Cadência manual e inconsistente",
      "Sem visão de quem foi abordado",
    ],
    solutions: [
      "Captura e enriquecimento de empresas e contatos",
      "Qualificação assistida por IA",
      "Cadência multicanal personalizada",
      "Painel de cobertura por território/segmento",
    ],
    automations: [
      "Coleta de leads de fontes públicas",
      "Score de potencial automático",
      "Disparos personalizados por persona",
      "Encaminhamento automático ao SDR",
    ],
    exampleSystem:
      "Motor de prospecção com captura, enriquecimento, score, cadência multicanal e CRM integrado.",
  },
];
