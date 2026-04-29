"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const urgencyOptions = [
  "Já está travando agora",
  "Próximos 30 dias",
  "Próximo trimestre",
  "Estamos planejando",
] as const;

const briefingSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  company: z.string().min(2, "Informe a empresa"),
  area: z.string().min(2, "Informe a área"),
  problem: z.string().min(10, "Descreva o problema com pelo menos 10 caracteres"),
  current: z.string().min(10, "Como é feito hoje? Mínimo 10 caracteres"),
  goal: z.string().min(10, "O que deseja automatizar? Mínimo 10 caracteres"),
  urgency: z.enum(urgencyOptions),
  contact: z.string().min(5, "Informe um contato (e-mail ou WhatsApp)"),
});

type Briefing = z.infer<typeof briefingSchema>;

export function BriefingGenerator() {
  const [submitted, setSubmitted] = React.useState<Briefing | null>(null);
  const [savedLocal, setSavedLocal] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Briefing>({
    resolver: zodResolver(briefingSchema),
    defaultValues: { urgency: "Próximos 30 dias" },
  });

  const urgency = watch("urgency");

  async function onSubmit(values: Briefing) {
    let stored = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "briefing", payload: values }),
      });
      const data = await res.json().catch(() => ({}));
      stored = data?.forwarded === true;
    } catch {
      stored = false;
    }
    if (!stored && typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("saganski_briefings") || "[]");
      existing.push({ ...values, ts: new Date().toISOString() });
      localStorage.setItem("saganski_briefings", JSON.stringify(existing));
    }
    setSavedLocal(!stored);
    setSubmitted(values);
  }

  function startOver() {
    reset();
    setSubmitted(null);
    setSavedLocal(false);
  }

  return (
    <Card className="overflow-hidden p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
            <FileText className="size-3.5" />
            Gerador de briefing
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Estruture o pedido em 60 segundos. Recebe um resumo pronto para enviar.
          </h3>
          <p className="mt-2 text-sm text-foreground/70">
            Sem cadastro. Os dados são enviados via webhook se configurado, ou
            armazenados localmente para você levar à reunião.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid gap-4"
            noValidate
          >
            <Field label="Seu nome" error={errors.name?.message}>
              <Input placeholder="Ex.: Marina Silva" {...register("name")} />
            </Field>
            <Field label="Empresa" error={errors.company?.message}>
              <Input placeholder="Ex.: Andrade Logística" {...register("company")} />
            </Field>
            <Field label="Área / cargo" error={errors.area?.message}>
              <Input
                placeholder="Ex.: Diretora de Operações"
                {...register("area")}
              />
            </Field>
            <Field label="Problema principal" error={errors.problem?.message}>
              <Textarea
                rows={3}
                placeholder="Resuma o gargalo que mais incomoda hoje."
                {...register("problem")}
              />
            </Field>
            <Field label="Como é feito hoje" error={errors.current?.message}>
              <Textarea
                rows={3}
                placeholder="Ferramentas, planilhas, fluxos manuais..."
                {...register("current")}
              />
            </Field>
            <Field
              label="O que deseja automatizar / construir"
              error={errors.goal?.message}
            >
              <Textarea
                rows={3}
                placeholder="Resultado desejado em 6-12 meses."
                {...register("goal")}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Urgência" error={errors.urgency?.message}>
                <Select
                  value={urgency}
                  onValueChange={(v) =>
                    setValue("urgency", v as Briefing["urgency"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyOptions.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field
                label="Contato (e-mail ou WhatsApp)"
                error={errors.contact?.message}
              >
                <Input
                  placeholder="email@empresa.com.br"
                  {...register("contact")}
                />
              </Field>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Gerando…
                  </>
                ) : (
                  "Gerar briefing"
                )}
              </Button>
              {submitted ? (
                <Button type="button" variant="ghost" onClick={startOver}>
                  Refazer
                </Button>
              ) : null}
            </div>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.05] to-brand-violet/[0.06] p-6 glow-ring"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80">
                <CheckCircle2 className="size-3 text-brand-cyan" />
                Briefing pronto
              </span>
              <h4 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {submitted.company} • {submitted.area}
              </h4>
              <p className="mt-1 text-sm text-foreground/70">
                Enviado por {submitted.name} ({submitted.contact}). Urgência:{" "}
                {submitted.urgency}.
              </p>

              <dl className="mt-5 grid gap-3 text-sm">
                <ResumeItem label="Problema principal" value={submitted.problem} />
                <ResumeItem label="Como é feito hoje" value={submitted.current} />
                <ResumeItem
                  label="O que deseja automatizar"
                  value={submitted.goal}
                />
              </dl>

              <p className="mt-5 text-[11px] leading-relaxed text-foreground/55">
                {savedLocal
                  ? "Briefing registrado localmente neste ambiente. Configure LEADS_WEBHOOK_URL para envio automático."
                  : "Briefing enviado para o canal configurado. Em breve um consultor responde."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-foreground/65"
            >
              <p className="font-display text-base font-semibold text-foreground">
                Pré-visualização do briefing
              </p>
              <p className="mt-2">
                Conforme você preenche, geramos um resumo executivo aqui — pronto para
                anexar a um e-mail, ata ou disparo interno.
              </p>
              <ul className="mt-4 space-y-1.5 text-[12px] uppercase tracking-[0.18em] text-foreground/45">
                <li>• Identificação da operação</li>
                <li>• Diagnóstico do problema</li>
                <li>• Estado atual e meta</li>
                <li>• Urgência declarada</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="text-[11px] text-rose-400/90">{error}</p>
      ) : null}
    </div>
  );
}

function ResumeItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <dt className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground/55">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {value}
      </dd>
    </div>
  );
}
