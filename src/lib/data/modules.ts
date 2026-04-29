export type Module = {
  id: string;
  label: string;
  description: string;
};

export const allModules: Module[] = [
  {
    id: "cadastro-inteligente",
    label: "Cadastro inteligente",
    description: "Cadastros centralizados com validação, deduplicação e auditoria.",
  },
  {
    id: "painel-gerencial",
    label: "Painel gerencial",
    description: "Dashboard executivo com métricas em tempo real por área e período.",
  },
  {
    id: "automacao-documental",
    label: "Automação documental",
    description: "Geração e leitura de contratos, propostas, laudos e relatórios.",
  },
  {
    id: "fluxo-de-aprovacao",
    label: "Fluxo de aprovação",
    description: "Aprovações por alçada com SLAs, rastreabilidade e notificação.",
  },
  {
    id: "relatorios",
    label: "Relatórios",
    description: "Relatórios sob medida, exportação e envio automático para gestores.",
  },
  {
    id: "chat-whatsapp",
    label: "Chat / WhatsApp integrado",
    description: "Atendimento e automação no WhatsApp com histórico no sistema.",
  },
  {
    id: "agente-ia",
    label: "Agente de IA interno",
    description: "Assistente que entende seus dados e executa tarefas repetitivas.",
  },
  {
    id: "portal-cliente",
    label: "Portal do cliente",
    description: "Área externa segura para clientes acompanharem demandas e enviarem documentos.",
  },
  {
    id: "ocr-documentos",
    label: "OCR e extração de documentos",
    description: "Leitura automática de PDFs, contratos, planilhas e formulários.",
  },
  {
    id: "integracoes-api",
    label: "Integrações com APIs",
    description: "Conexão com ERP, banco, gateways e ferramentas internas.",
  },
  {
    id: "tarefas-equipe",
    label: "Tarefas e equipe",
    description: "Distribuição de tarefas, prazos e produtividade por colaborador.",
  },
  {
    id: "auditoria-permissoes",
    label: "Auditoria e permissões",
    description: "Controle granular de acesso e log completo de ações.",
  },
];

export const moduleById = Object.fromEntries(allModules.map((m) => [m.id, m]));
