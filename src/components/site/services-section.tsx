"use client";

import { ServiceCard } from "./service-card";
import { SectionShell } from "./section-shell";
import { services } from "@/lib/data/services";

export function ServicesSection() {
  return (
    <SectionShell
      id="solucoes"
      eyebrow="O que criamos"
      title={
        <>
          Soluções desenhadas para resolver{" "}
          <span className="gradient-text">problemas reais</span> de operação.
        </>
      }
      description="Não vendemos sistema pronto. Criamos tecnologia moldada ao processo real da sua empresa, com módulos que se conectam entre si e crescem com a operação."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, i) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </SectionShell>
  );
}
