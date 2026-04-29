"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";
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
import { sectors } from "@/lib/data/sectors";
import { SectionShell } from "./section-shell";

const sizeOptions = [
  "Até 10 pessoas",
  "11 a 50 pessoas",
  "51 a 200 pessoas",
  "201 a 500 pessoas",
  "Mais de 500 pessoas",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  company: z.string().min(2, "Informe a empresa"),
  whatsapp: z.string().min(8, "Informe o WhatsApp"),
  email: z.string().email("E-mail inválido"),
  sector: z.string().min(1, "Selecione um setor"),
  pain: z.string().min(10, "Resuma a dor principal"),
  size: z.enum(sizeOptions),
  message: z.string().optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [success, setSuccess] = React.useState(false);
  const [savedLocal, setSavedLocal] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { size: "11 a 50 pessoas" },
  });

  const sector = watch("sector");
  const size = watch("size");

  async function onSubmit(values: ContactPayload) {
    let stored = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", payload: values }),
      });
      const data = await res.json().catch(() => ({}));
      stored = data?.forwarded === true;
    } catch {
      stored = false;
    }
    if (!stored && typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("saganski_leads") || "[]");
      list.push({ ...values, ts: new Date().toISOString() });
      localStorage.setItem("saganski_leads", JSON.stringify(list));
    }
    setSavedLocal(!stored);
    setSuccess(true);
  }

  function startOver() {
    reset();
    setSuccess(false);
    setSavedLocal(false);
  }

  return (
    <SectionShell
      id="contato"
      eyebrow="Contato premium"
      title={
        <>
          Diagnóstico em até 48h.{" "}
          <span className="gradient-text">Resposta humana, sem fila genérica.</span>
        </>
      }
      description="Conte o cenário. Voltamos com perguntas específicas, possibilidades de arquitetura e próximos passos. Sem proposta automática, sem promessa irreal."
    >
      <Card className="overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid gap-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nome" error={errors.name?.message}>
                      <Input placeholder="Como você se chama?" {...register("name")} />
                    </Field>
                    <Field label="Empresa" error={errors.company?.message}>
                      <Input placeholder="Razão social ou marca" {...register("company")} />
                    </Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="WhatsApp" error={errors.whatsapp?.message}>
                      <Input
                        placeholder="(00) 00000-0000"
                        inputMode="tel"
                        {...register("whatsapp")}
                      />
                    </Field>
                    <Field label="E-mail" error={errors.email?.message}>
                      <Input
                        type="email"
                        placeholder="email@empresa.com.br"
                        {...register("email")}
                      />
                    </Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Setor" error={errors.sector?.message}>
                      <Select
                        value={sector}
                        onValueChange={(v) =>
                          setValue("sector", v, { shouldValidate: true })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((s) => (
                            <SelectItem key={s.id} value={s.name}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Tamanho da operação" error={errors.size?.message}>
                      <Select
                        value={size}
                        onValueChange={(v) =>
                          setValue("size", v as ContactPayload["size"], {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizeOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Principal dor" error={errors.pain?.message}>
                    <Textarea
                      rows={3}
                      placeholder="O que mais consome tempo ou trava resultado hoje?"
                      {...register("pain")}
                    />
                  </Field>
                  <Field label="Mensagem (opcional)">
                    <Textarea
                      rows={3}
                      placeholder="Algum detalhe extra, contexto ou referência."
                      {...register("message")}
                    />
                  </Field>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Solicitar diagnóstico
                          <Send className="size-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-foreground/55">
                      Ao enviar, você concorda em ser contactado para o diagnóstico
                      solicitado.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-brand-cyan/30 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.05] to-brand-violet/[0.06] p-6 glow-ring"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80">
                    <CheckCircle2 className="size-3 text-brand-cyan" />
                    Pedido recebido
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                    Recebemos seu pedido de diagnóstico.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {savedLocal
                      ? "Briefing registrado localmente neste ambiente. Configure LEADS_WEBHOOK_URL para envio automático ao seu canal interno."
                      : "Em até 48h um consultor entra em contato pelo canal informado com perguntas específicas e possibilidades iniciais."}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Button variant="outline" onClick={startOver}>
                      Enviar outro
                    </Button>
                    <Button asChild>
                      <a href="#consultor">Conversar com a IA Consultora</a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="grid gap-3 self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                <Sparkles className="size-4" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold tracking-tight">
                IA aplicada não é enfeite
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                Ela precisa economizar tempo, reduzir erro e acelerar decisão. É assim
                que recomendamos.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                <ShieldCheck className="size-4" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold tracking-tight">
                Diagnóstico antes de proposta
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                Não enviamos preço fechado sem entender ambiente, dados e regras
                internas. É mais respeitoso com o seu tempo.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-display text-sm font-semibold tracking-tight">
                Do operacional ao estratégico
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                Sistemas para organizar, automatizar e escalar. Sem projeto-vitrine,
                sem entregar o que não roda.
              </p>
            </div>
          </aside>
        </div>
      </Card>
    </SectionShell>
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
      {error ? <p className="text-[11px] text-rose-400/90">{error}</p> : null}
    </div>
  );
}
