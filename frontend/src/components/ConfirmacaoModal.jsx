import React from 'react';
import { IconPackage, IconCheckCircle, IconAlertTriangle, IconClipboardCheck } from './Icons';

/**
 * Modal de Confirmação de Baixa da Entrega em Campo (RF03).
 * Acessível (WCAG 2.1 AA), com textos afirmativos, proteção contra duplo clique e zero emojis.
 */
export default function ConfirmacaoModal({ entrega, onConfirm, onCancel, loading }) {
  if (!entrega) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden transform transition-all">
        
        {/* Cabeçalho do Modal */}
        <div className="bg-stone-50 border-b border-stone-200/80 p-5 sm:p-6 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center flex-shrink-0">
            <IconClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-stone-900">
              Confirmar Recebimento da Doação
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Protocolo de Baixa Oficial • Rota #{entrega.id_entrega.toString().padStart(4, '0')}
            </p>
          </div>
        </div>

        {/* Corpo com Informações da Família e Itens */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
            <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
              Beneficiário Cadastrado
            </div>
            <div className="text-base font-bold text-stone-900 mt-0.5">
              {entrega.familia_nome || `Família #${entrega.id_familia}`}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {entrega.endereco_completo}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider mb-2">
              Itens para Conferência Físico-Visual
            </div>
            <div className="space-y-1.5">
              {entrega.itens?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-stone-800 text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <IconPackage className="w-4 h-4 text-orange-600" />
                    <span>{item.descricao_item || `Item #${item.id_item}`}</span>
                  </span>
                  <span className="font-bold text-stone-900 bg-white border border-stone-200 px-2.5 py-0.5 rounded-full text-xs">
                    {item.quantidade} unid
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aviso com Independência de Cor */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 text-amber-950 text-xs flex items-start gap-2.5">
            <IconAlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Ao confirmar, a baixa será registrada de forma permanente e irreversível com carimbo temporal no servidor central.
            </span>
          </div>
        </div>

        {/* Rodapé de Ações com Alvos de Toque Acessíveis */}
        <div className="bg-stone-50 border-t border-stone-200/80 p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="btn-secondary min-h-[46px] w-full sm:w-auto"
          >
            Voltar para Lista de Rotas
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onConfirm(entrega.id_entrega)}
            className="btn-success min-h-[46px] w-full sm:w-auto"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Registrando Baixa...</span>
              </>
            ) : (
              <>
                <IconCheckCircle className="w-4 h-4 mr-2" />
                <span>Confirmar Entrega Realizada</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
