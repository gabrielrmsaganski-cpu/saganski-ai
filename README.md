# SAGANSKI AI

Site institucional premium da SAGANSKI AI — sistemas inteligentes sob medida para empresas.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS 3** com design tokens próprios e tema escuro premium
- **Motion** para animações e microinterações
- **@react-three/fiber + drei** para o núcleo neural 3D do hero
- **Vercel AI SDK** + **@ai-sdk/openai** com fallback consultivo offline
- **React Hook Form + Zod** nos formulários
- **Radix UI** primitivos (Dialog, Tabs, Slider, Select, Accordion, etc.)
- **Lucide React** para ícones

## Como rodar localmente

```bash
cd saganski-ai
npm install            # já configurado com legacy-peer-deps via .npmrc
cp .env.example .env.local   # opcional — site roda sem variáveis
npm run dev            # http://localhost:3000
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o dev server |
| `npm run build` | Build de produção |
| `npm run start` | Roda a build de produção |
| `npm run lint` | ESLint (Next + TS) |

## Variáveis de ambiente disponíveis

Todas opcionais — o site funciona sem nenhuma delas.

| Variável | Função | Default |
|---|---|---|
| `AI_PROVIDER` | Provedor do chat IA | `openai` |
| `OPENAI_API_KEY` | Chave do provedor | _(vazio → modo offline)_ |
| `OPENAI_BASE_URL` | Endpoint compatível com OpenAI (Foundry, litellm, etc.) | _(vazio → openai.com)_ |
| `OPENAI_MODEL` | Modelo default | `gpt-4o-mini` |
| `NEXT_PUBLIC_AI_MODELS` | Lista CSV de modelos exibidos no seletor da UI | _(vazio → só o default)_ |
| `LEADS_WEBHOOK_URL` | Webhook para receber leads/briefings | _(vazio → fallback localStorage)_ |
| `NEXT_PUBLIC_SITE_URL` | URL pública (metadata, OG) | `https://saganski.ai` |

### Integração com Azure AI Foundry / litellm

O site já está configurado em `.env.local` (não versionado) para o Foundry local:

```bash
OPENAI_API_KEY=<sua chave>
OPENAI_BASE_URL=http://127.0.0.1:4000/v1
OPENAI_MODEL=gpt-5.4-mini
NEXT_PUBLIC_AI_MODELS=gpt-5.4-mini,gpt-5.4,o4-mini,claude-sonnet-4-6,claude-opus-4-7,claude-haiku-4-5,llama3.1
```

Modelos validados em streaming via `/api/chat`:
- `gpt-5.4-mini` (default, rápido)
- `gpt-5.4` (premium)
- `o4-mini` (raciocínio)
- `claude-sonnet-4-6`, `claude-opus-4-7`, `claude-haiku-4-5`
- `llama3.1`

O usuário pode trocar de modelo direto no header do chat (Select primitive) — o body da request envia `model` e o servidor valida contra `NEXT_PUBLIC_AI_MODELS`.

## Acesso externo

Para expor o site sem deploy, use Cloudflare Quick Tunnel:

```bash
PORT=3210 npm run start &        # ou npm run dev
cloudflared tunnel --url http://localhost:3210
```

A saída mostra uma URL `https://*.trycloudflare.com` que funciona via HTTPS por todo o mundo enquanto o `cloudflared` estiver rodando. Para produção, usar tunnel nomeado com conta Cloudflare e DNS próprio.

### Fallbacks automáticos
- **Chat sem chave válida** → resposta consultiva determinística com diagnóstico por setor
- **Chat com chave válida mas modelo indisponível** → detecção de stream vazio em 5s e troca para fallback
- **Webhook ausente** → leads ficam em `localStorage` com chave `saganski_leads` / `saganski_briefings`

## Estrutura

```
src/
├── app/
│   ├── layout.tsx          # Metadata + OG + fontes
│   ├── page.tsx            # Página única, todas as seções
│   ├── globals.css         # Tokens, gradientes, classes premium
│   └── api/
│       ├── chat/route.ts   # IA + fallback robusto
│       └── leads/route.ts  # Webhook ou fallback local
├── components/
│   ├── site/               # Seções e ferramentas
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── neural-background.tsx
│   │   ├── service-card.tsx
│   │   ├── services-section.tsx
│   │   ├── sector-explorer.tsx
│   │   ├── tools-section.tsx
│   │   ├── time-savings-calculator.tsx
│   │   ├── digital-maturity-diagnostic.tsx
│   │   ├── system-builder.tsx
│   │   ├── briefing-generator.tsx
│   │   ├── ai-consultant-chat.tsx
│   │   ├── chat-section.tsx
│   │   ├── chat-floating.tsx
│   │   ├── process-timeline.tsx
│   │   ├── architecture-layers.tsx
│   │   ├── before-after.tsx
│   │   ├── for-whom.tsx
│   │   ├── contact-section.tsx
│   │   └── footer.tsx
│   └── ui/                 # Primitivos shadcn-style
└── lib/
    ├── utils.ts
    ├── data/
    │   ├── services.ts
    │   ├── sectors.ts       # 12 setores estruturados
    │   └── modules.ts
    └── chat/
        ├── system-prompt.ts # Persona + guard rails
        └── fallback.ts      # Diagnóstico determinístico offline
```

## Validações realizadas

- ✅ `npm run build` — passou com 4 rotas geradas, sem erros TS
- ✅ `npm run lint` — zero warnings/errors
- ✅ Hero 3D neural (R3F v9 + React 19) renderizando com 90 nós e arestas
- ✅ Header sticky com blur + menu mobile
- ✅ 16 cards de serviços com hover gradient
- ✅ 12 setores no explorer com pains/solutions/automations/example
- ✅ 4 ferramentas funcionais (calculadora, diagnóstico 6 perguntas, montador, briefing)
- ✅ Chat consultor com modo AI Live e Offline (badge dinâmico)
- ✅ Streaming de resposta com cursor pulsante
- ✅ FAB chat flutuante abrindo painel completo
- ✅ Form de contato com 8 campos validados via Zod
- ✅ Mobile a 390px sem regressões
- ✅ SEO base (metadata, OG, viewport, canonical, lang pt-BR)

## O que ainda depende de credenciais reais

| Recurso | Como ativar |
|---|---|
| Chat com IA real | `OPENAI_API_KEY` (e `OPENAI_BASE_URL` se proxy próprio) |
| Recebimento de leads/briefings | `LEADS_WEBHOOK_URL` apontando para CRM/Make/n8n/Slack |
| Domínio | Configurar `NEXT_PUBLIC_SITE_URL` no deploy |
| Imagem OG própria | Adicionar `app/opengraph-image.tsx` ou `public/og.png` |

## Decisões de design

- Fundo escuro com gradientes radiais sobrepostos (azul elétrico + ciano + violeta)
- Glassmorphism contido em cards (border 1px, blur leve, hover brightness)
- Tipografia: Space Grotesk display + Inter sans + JetBrains mono (variáveis CSS)
- Microinterações: hover-glow nos cards de serviço com posição do mouse
- Neural background opt-out automático via `prefers-reduced-motion`
- Cinco categorias de níveis no diagnóstico (Manual → Escalável)

## Notas técnicas

- `legacy-peer-deps=true` em `.npmrc` por compatibilidade R3F + React 19
- Chat usa custom ReadableStream com timeout de 5s na primeira chunk antes de cair no fallback — evita travar a UI quando o provedor de IA retorna stream vazio
- Sem persistência server-side: leads viram webhook ou ficam no client (`localStorage`)
- Sem dependências de banco — pronto para deploy em Vercel/Cloudflare/Netlify

---

© SAGANSKI AI — Engineered for clarity, built with care.
