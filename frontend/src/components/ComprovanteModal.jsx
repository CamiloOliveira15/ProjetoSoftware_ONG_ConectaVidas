import React, { useEffect } from 'react';
import { IconPackage, IconCheckCircle, IconX } from './Icons';

/**
 * Modal de Comprovante Digital Pós-Entrega (RF03).
 * Fecha ao clicar fora (backdrop), ao pressionar ESC ou no botão X.
 * Design limpo, profissional, sem emojis e com carimbo temporal.
 */
export default function ComprovanteModal({ entrega, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!entrega) return null;

  const dataConclusao = entrega.concluido_em || entrega.data_agendada || 'Registrado no servidor';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comprovante-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
        
        {/* Botão de Fechar X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800/50 transition-colors z-10"
          aria-label="Fechar comprovante"
        >
          <IconX className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Recibo */}
        <div className="bg-emerald-900 text-white p-6 text-center">
          <div className="w-11 h-11 mx-auto rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center mb-2.5 text-emerald-100 shadow-xs">
            <IconCheckCircle className="w-6 h-6" />
          </div>
          <h3 id="comprovante-title" className="text-base font-bold tracking-tight">
            Comprovante de Entrega Concluída
          </h3>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            Associação Comunitária Pão e Vida • ONG Conecta Vidas
          </p>
        </div>

        {/* Detalhes do Recibo */}
        <div className="p-6 space-y-4">
          <div className="border-b border-dashed border-slate-200 pb-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Protocolo de Baixa:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                #{entrega.id_entrega.toString().padStart(6, '0')}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Carimbo Temporal:</span>
              <span className="font-semibold text-slate-800">{dataConclusao}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Status Operacional:</span>
              <span className="font-bold text-emerald-700">CONCLUÍDO (Baixa Registrada)</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500">
              Beneficiário Responsável
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              {entrega.familia_nome || `Família #${entrega.id_familia}`}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {entrega.endereco_completo}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5">
              Donativos Conferidos
            </div>
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {entrega.itens?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <IconPackage className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.descricao_item || `Item #${item.id_item}`}</span>
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">{item.quantidade} unid</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Rastreabilidade contábil em conformidade com a LGPD e o ODS 2.1.
          </div>
        </div>

        {/* Botão de Fechamento */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] btn-secondary text-slate-800 font-semibold"
          >
            Fechar Recibo
          </button>
        </div>

      </div>
    </div>
  );
}
