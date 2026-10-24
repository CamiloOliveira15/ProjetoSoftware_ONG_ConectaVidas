import React, { useEffect } from 'react';
import { IconPackage, IconCheckCircle, IconAlertTriangle, IconClipboardCheck, IconX } from './Icons';

/**
 * Modal de Confirmação de Baixa da Entrega em Campo (RF03).
 * Fecha ao clicar fora (backdrop), ao pressionar ESC ou no botão fechar/voltar.
 * Tipografia equilibrada e conformidade total WCAG 2.1 AA.
 */
export default function ConfirmacaoModal({ entrega, onConfirm, onCancel, loading }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, onCancel]);

  if (!entrega) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all">
        
        {/* Cabeçalho do Modal com botão X de fechar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center flex-shrink-0">
              <IconClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-slate-900">
                Confirmar Recebimento da Doação
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Rota #{entrega.id_entrega.toString().padStart(4, '0')}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Fechar janela"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com Informações da Família e Itens */}
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">
              Família Beneficiária
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              {entrega.familia_nome || `Família #${entrega.id_familia}`}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {entrega.endereco_completo}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2">
              Donativos para Conferência Visual
            </div>
            <div className="space-y-1.5">
              {entrega.itens?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                >
                  <span className="flex items-center gap-2">
                    <IconPackage className="w-4 h-4 text-orange-700" />
                    <span>{item.descricao_item || `Item #${item.id_item}`}</span>
                  </span>
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-0.5 rounded text-xs tabular-nums">
                    {item.quantidade} unid
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aviso com Independência de Cor */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
            <IconAlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Ao confirmar, a baixa será registrada de forma permanente e auditada com carimbo temporal no servidor central.
            </span>
          </div>
        </div>

        {/* Rodapé de Ações */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="btn-secondary min-h-[44px] w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onConfirm(entrega.id_entrega)}
            className="btn-success min-h-[44px] w-full sm:w-auto"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <IconCheckCircle className="w-4 h-4 mr-2" />
                <span>Confirmar Entrega</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
