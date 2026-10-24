import React from 'react';
import { IconPackage, IconCheckCircle, IconClipboardCheck } from './Icons';

/**
 * Modal e Cartão de Comprovante Digital Pós-Entrega (RF03).
 * Design limpo, profissional, sem emojis e com carimbo temporal.
 */
export default function ComprovanteModal({ entrega, onClose }) {
  if (!entrega) return null;

  const dataConclusao = entrega.concluido_em || entrega.data_agendada || 'Registrado no servidor';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comprovante-title"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Cabeçalho do Recibo */}
        <div className="bg-emerald-900 text-white p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-800 border border-emerald-600/60 flex items-center justify-center mb-3 text-emerald-100">
            <IconCheckCircle className="w-6 h-6" />
          </div>
          <h3 id="comprovante-title" className="text-lg font-bold tracking-tight">
            Comprovante de Entrega Concluída
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            Associação Comunitária Pão e Vida • ONG Conecta Vidas
          </p>
        </div>

        {/* Detalhes do Recibo */}
        <div className="p-6 space-y-4">
          <div className="border-b border-dashed border-stone-200 pb-3.5 space-y-1.5">
            <div className="flex justify-between text-xs text-stone-500">
              <span>Protocolo de Baixa:</span>
              <span className="font-mono font-bold text-stone-900">
                #{entrega.id_entrega.toString().padStart(6, '0')}
              </span>
            </div>
            <div className="flex justify-between text-xs text-stone-500">
              <span>Carimbo Temporal:</span>
              <span className="font-semibold text-stone-800">{dataConclusao}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-500">
              <span>Status Operacional:</span>
              <span className="font-bold text-emerald-700">CONCLUÍDO (Baixa Registrada)</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Beneficiário Responsável
            </div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">
              {entrega.familia_nome || `Família #${entrega.id_familia}`}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              {entrega.endereco_completo}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Donativos Conferidos
            </div>
            <div className="space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
              {entrega.itens?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-stone-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <IconPackage className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.descricao_item || `Item #${item.id_item}`}</span>
                  </span>
                  <span className="font-bold text-stone-900">{item.quantidade} unid</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-[11px] text-stone-400 pt-3 border-t border-stone-100 leading-relaxed">
            Rastreabilidade contábil e auditoria em conformidade com a LGPD e o ODS 2.
          </div>
        </div>

        {/* Botão de Fechamento */}
        <div className="p-4 bg-stone-50 border-t border-stone-200/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] btn-secondary text-stone-800 font-semibold"
          >
            Concluir e Fechar Recibo
          </button>
        </div>

      </div>
    </div>
  );
}
