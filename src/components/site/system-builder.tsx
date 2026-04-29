"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Boxes, Plus, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { sectors } from "@/lib/data/sectors";
import { allModules } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

const dorOptions = [
  { id: "planilhas", label: "Operação em planilhas" },
  { id: "documentos", label: "Documentos manuais" },
  { id: "aprovacoes", label: "Aprovações lentas" },
  { id: "atendimento", label: "Atendimento descentralizado" },
  { id: "indicadores", label: "Falta de indicadores" },
  { id: "integracao", label: "Sistemas isolados" },
  { id: "tarefas", label: "Tarefas perdidas" },
  { id: "leitura-doc", label: "Leitura de PDFs e contratos" },
];

type Recipe = {
  pain: string;
  modules: string[];
};

const painToModules: Recipe[] = [
  {
    pain: "planilhas",
    modules: ["cadastro-inteligente", "painel-gerencial", "tarefas-equipe"],
  },
  {
    pain: "documentos",
    modules: ["automacao-documental", "ocr-documentos", "auditoria-permissoes"],
  },
  {
    pain: "aprovacoes",
    modules: ["fluxo-de-aprovacao", "auditoria-permissoes", "tarefas-equipe"],
  },
  {
    pain: "atendimento",
    modules: ["chat-whatsapp", "agente-ia", "portal-cliente"],
  },
  {
    pain: "indicadores",
    modules: ["painel-gerencial", "relatorios"],
  },
  {
    pain: "integracao",
    modules: ["integracoes-api", "cadastro-inteligente"],
  },
  {
    pain: "tarefas",
    modules: ["tarefas-equipe", "fluxo-de-aprovacao"],
  },
  {
    pain: "leitura-doc",
    modules: ["ocr-documentos", "agente-ia"],
  },
];

export function SystemBuilder() {
  const [sectorId, setSectorId] = React.useState<string>(sectors[0].id);
  const [pains, setPains] = React.useState<string[]>(["planilhas", "documentos"]);
  const [users, setUsers] = React.useState<number>(20);
  const [withAI, setWithAI] = React.useState(true);
  const [withDocs, setWithDocs] = React.useState(true);
  const [withWhatsApp, setWithWhatsApp] = React.useState(false);
  const [withDashboard, setWithDashboard] = React.useState(true);

  function togglePain(id: string) {
    setPains((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  const moduleIds = React.useMemo(() => {
    const set = new Set<string>(["cadastro-inteligente"]);
    pains.forEach((p) => {
      const r = painToModules.find((x) => x.pain === p);
      r?.modules.forEach((m) => set.add(m));
    });
    if (withAI) set.add("agente-ia");
    if (withDocs) {
      set.add("automacao-documental");
      set.add("ocr-documentos");
    }
    if (withWhatsApp) set.add("chat-whatsapp");
    if (withDashboard) set.add("painel-gerencial");
    if (users > 30) set.add("auditoria-permissoes");
    set.add("relatorios");
    return Array.from(set);
  }, [pains, users, withAI, withDocs, withWhatsApp, withDashboard]);

  const sector = sectors.find((s) => s.id === sectorId)!;
  const modules = moduleIds
    .map((id) => allModules.find((m) => m.id === id))
    .filter(Boolean) as typeof allModules;

  return (
    <Card className="overflow-hidden p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
            <Wand2 className="size-3.5" />
            Montador de sistema ideal
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Combine setor, dores e necessidades. Geramos os módulos sugeridos.
          </h3>
          <p className="mt-2 text-sm text-foreground/70">
            Esta é uma sugestão automática para apoiar o diagnóstico. Cada operação tem
            ajustes próprios.
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <Label>Setor</Label>
              <Select value={sectorId} onValueChange={setSectorId}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione um setor" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Dores principais</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {dorOptions.map((d) => {
                  const selected = pains.includes(d.id);
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => togglePain(d.id)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        selected
                          ? "border-brand-cyan/40 bg-brand-cyan/10 text-foreground"
                          : "border-white/10 bg-white/[0.03] text-foreground/70 hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      {selected ? "✓ " : ""}
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <Label>Quantidade de usuários</Label>
                <span className="font-mono text-sm text-foreground">{users}</span>
              </div>
              <Slider
                value={[users]}
                min={3}
                max={300}
                step={1}
                onValueChange={(v) => setUsers(v[0] ?? 0)}
                className="mt-3"
                aria-label="Usuários"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Switch label="IA aplicada" value={withAI} onChange={setWithAI} />
              <Switch
                label="Documentos automatizados"
                value={withDocs}
                onChange={setWithDocs}
              />
              <Switch
                label="WhatsApp integrado"
                value={withWhatsApp}
                onChange={setWithWhatsApp}
              />
              <Switch
                label="Dashboard executivo"
                value={withDashboard}
                onChange={setWithDashboard}
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.05] to-brand-violet/[0.06] p-5 glow-ring"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80">
            <Boxes className="size-3 text-brand-cyan" />
            Sugestão de módulos
          </span>
          <p className="mt-4 font-display text-xl font-semibold tracking-tight">
            Sistema sob medida para {sector.name.toLowerCase()}
          </p>
          <p className="mt-1 text-sm text-foreground/70">
            {modules.length} módulos sugeridos com base nas dores e necessidades
            selecionadas.
          </p>

          <ul className="mt-5 grid gap-2">
            {modules.map((m) => (
              <li
                key={m.id}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                  <Sparkles className="size-3" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{m.label}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-foreground/65">
                    {m.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <a href="#contato">
                Validar com diagnóstico
                <Plus className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="#consultor">Refinar com IA Consultora</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

function Switch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cn(
        "flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
        value
          ? "border-brand-cyan/40 bg-brand-cyan/10 text-foreground"
          : "border-white/10 bg-white/[0.03] text-foreground/75 hover:border-white/20"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "ml-2 inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
          value ? "bg-brand-cyan/40" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-white shadow transition-transform",
            value ? "translate-x-4" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
