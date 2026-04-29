"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { AIConsultantChat } from "./ai-consultant-chat";
import { cn } from "@/lib/utils";

export function ChatFloating() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Fechar chat consultor" : "Abrir chat consultor"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-brand-electric via-brand-cyan to-brand-violet text-white shadow-[0_18px_60px_-15px_rgba(34,211,238,0.7)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50",
          open && "rotate-90"
        )}
      >
        {open ? <X className="size-5" /> : <MessageSquare className="size-5" />}
        {!open ? (
          <span className="absolute -top-0.5 -right-0.5 inline-flex size-3 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(4,7,17,0.95)] animate-pulse-soft" />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-md sm:w-[420px]"
          >
            <div className="h-[640px] max-h-[80vh]">
              <AIConsultantChat variant="compact" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
