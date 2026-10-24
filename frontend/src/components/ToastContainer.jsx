import React, { useContext } from 'react';
import { IconCheckCircle, IconAlertTriangle, IconShield, IconX } from './Icons';

/**
 * Contêiner de Notificações Toast Personalizadas In-App.
 * Substitui alertas nativos do navegador por notificações de alto padrão visual e acessibilidade.
 */
export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0"
    >
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';
        const isWarning = t.type === 'warning';

        let badgeBg = 'bg-stone-900 border-stone-700 text-stone-100';
        let iconElem = <IconShield className="w-5 h-5 text-stone-400" />;

        if (isSuccess) {
          badgeBg = 'bg-white border-emerald-500/40 text-stone-900 shadow-emerald-500/10';
          iconElem = (
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <IconCheckCircle className="w-5 h-5" />
            </div>
          );
        } else if (isError) {
          badgeBg = 'bg-white border-rose-500/40 text-stone-900 shadow-rose-500/10';
          iconElem = (
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center flex-shrink-0">
              <IconAlertTriangle className="w-5 h-5" />
            </div>
          );
        } else if (isWarning) {
          badgeBg = 'bg-white border-amber-500/40 text-stone-900 shadow-amber-500/10';
          iconElem = (
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
              <IconAlertTriangle className="w-5 h-5" />
            </div>
          );
        }

        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-3 flex items-start gap-3 ${badgeBg}`}
          >
            {iconElem}

            <div className="flex-1 min-w-0 pt-0.5">
              {t.title && (
                <div className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  {t.title}
                </div>
              )}
              {t.message && (
                <p className="text-xs text-stone-600 mt-0.5 font-medium leading-relaxed">
                  {t.message}
                </p>
              )}
            </div>

            <button
              onClick={() => onRemove(t.id)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-stone-500"
              aria-label="Fechar notificação"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
