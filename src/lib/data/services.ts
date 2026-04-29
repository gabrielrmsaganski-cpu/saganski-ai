import {
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Cog,
  Database,
  FileSearch,
  FileSignature,
  GanttChartSquare,
  Gauge,
  HandCoins,
  Headphones,
  KanbanSquare,
  LayoutDashboard,
  MessagesSquare,
  Network,
  ScanText,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
};

export const services: Service[] = [
  {
    title: "CRM sob medida",
    description:
      "Funil comercial moldado ao seu processo, com etapas, automações, lembretes e visão por vendedor — sem campos inúteis ou módulos engessados.",
    icon: KanbanSquare,
    tags: ["Comercial", "Funil", "Automação"],
  },
  {
    title: "Sistemas internos",
    description:
      "Plataformas web internas para tarefas que hoje vivem em planilhas, e-mail e WhatsApp solto. Cadastros, fluxos, permissões e auditoria.",
    icon: Cog,
    tags: ["Operação", "Workflow"],
  },
  {
    title: "Painéis executivos",
    description:
      "Dashboards em tempo real que conectam dados de várias fontes e respondem perguntas reais de gestão, não só gráficos bonitos.",
    icon: LayoutDashboard,
    tags: ["BI", "Indicadores"],
  },
  {
    title: "Automação de documentos",
    description:
      "Geração, preenchimento e validação automática de contratos, propostas, laudos e relatórios — preservando layout oficial.",
    icon: FileSignature,
    tags: ["Documentos", "Compliance"],
  },
  {
    title: "Bots e agentes de IA",
    description:
      "Agentes especializados que entendem seus dados, executam tarefas, consultam APIs e operam com regras de negócio definidas por você.",
    icon: BrainCircuit,
    tags: ["IA aplicada", "Agentes"],
  },
  {
    title: "Portais para clientes",
    description:
      "Áreas externas seguras para clientes acompanharem processos, enviarem documentos e resolverem demandas sem depender de e-mail.",
    icon: ShieldCheck,
    tags: ["Self-service", "B2B"],
  },
  {
    title: "Gestão de equipes",
    description:
      "Tarefas, prazos, aprovações, escala e produtividade em um único lugar, com histórico rastreável e responsabilidade clara.",
    icon: Users,
    tags: ["Times", "Produtividade"],
  },
  {
    title: "Fluxos comerciais",
    description:
      "Da prospecção ao fechamento: enriquecimento de leads, qualificação, propostas, contratos e onboarding integrados.",
    icon: GanttChartSquare,
    tags: ["Vendas", "Pré-venda"],
  },
  {
    title: "RH digital",
    description:
      "Admissão, jornada, ponto, treinamentos, avaliações, desligamento — com documentos automatizados e dados centralizados.",
    icon: ClipboardCheck,
    tags: ["RH", "Pessoas"],
  },
  {
    title: "Financeiro inteligente",
    description:
      "Contas a pagar e receber, conciliação, fluxo de caixa, alertas e regras automáticas conectadas ao seu banco e ERP.",
    icon: HandCoins,
    tags: ["Finanças", "Conciliação"],
  },
  {
    title: "Jurídico operacional",
    description:
      "Acompanhamento de processos, prazos, contratos, audiências e provisões com IA assistindo a análise e a redação.",
    icon: Scale,
    tags: ["Jurídico", "Prazos"],
  },
  {
    title: "Logística e operação",
    description:
      "Pedidos, rotas, estoque, recebimento e expedição com painéis de fila, exceções e indicadores por etapa.",
    icon: Truck,
    tags: ["Logística", "Operação"],
  },
  {
    title: "Análise de dados",
    description:
      "Pipelines de dados, modelos analíticos e dashboards executivos para responder perguntas estratégicas com números reais.",
    icon: Database,
    tags: ["Dados", "Analytics"],
  },
  {
    title: "Integrações com APIs",
    description:
      "Conectamos seu sistema a ERPs, bancos, gateways, marketplaces, ferramentas internas e qualquer API com documentação disponível.",
    icon: Network,
    tags: ["APIs", "Integração"],
  },
  {
    title: "WhatsApp inteligente",
    description:
      "Atendimento e automação no WhatsApp com filas, respostas guiadas, IA, transferência humana e histórico no CRM.",
    icon: MessagesSquare,
    tags: ["Atendimento", "IA"],
  },
  {
    title: "Upload e leitura de documentos",
    description:
      "OCR, classificação e extração automática de PDFs, contratos, planilhas e formulários — com validação humana opcional.",
    icon: ScanText,
    tags: ["OCR", "IA"],
  },
];

export const heroBenefits = [
  { label: "Automação de tarefas", icon: Workflow },
  { label: "IA aplicada ao negócio", icon: BrainCircuit },
  { label: "Painéis de gestão", icon: Gauge },
  { label: "Documentos inteligentes", icon: FileSearch },
  { label: "Integrações", icon: Boxes },
  { label: "Economia de tempo", icon: Clock },
];

export type HeroBenefit = (typeof heroBenefits)[number];

export const support = {
  serviceLabel: "atendimento estratégico",
  channel: Headphones,
};
