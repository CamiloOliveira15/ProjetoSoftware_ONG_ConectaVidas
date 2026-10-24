import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import ConfirmacaoModal from './ConfirmacaoModal';
import ComprovanteModal from './ComprovanteModal';
import {
  IconPackage,
  IconMapPin,
  IconNavigation,
  IconPhone,
  IconClock,
  IconCheckCircle,
  IconRefresh,
  IconClipboardCheck,
} from './Icons';

/**
 * Painel de Escalas e Rotas de Entrega do Voluntário (RF02 / RF04).
 * Mobile-first, isolamento por voluntário, zero emojis e design system profissional.
 */
export default function EscalaView({ usuario }) {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entregaParaConfirmar, setEntregaParaConfirmar] = useState(null);
  const [comprovanteAtivo, setComprovanteAtivo] = useState(null);
  const [confirmando, setConfirmando] = useState(false);
  const toast = useToast();

  const carregarEntregas = async (mostrarToast = false) => {
    setLoading(true);
    try {
      const data = await api.getEntregas();
      setEntregas(data);
      if (mostrarToast) {
        toast.info('Escala Atualizada', `${data.length} rota(s) sincronizada(s) com a sede.`);
      }
    } catch (err) {
      toast.error('Falha de Sincronização', err.message || 'Erro ao carregar rotas de entrega.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEntregas();
  }, []);

  const handleConcluir = async (entregaId) => {
    setConfirmando(true);
    try {
      const atualizada = await api.concluirEntrega(entregaId);
      setEntregaParaConfirmar(null);
      setEntregas((prev) =>
        prev.map((e) => (e.id_entrega === entregaId ? atualizada : e))
      );
      setComprovanteAtivo(atualizada);
      toast.success(
        'Entrega Registrada',
        `A baixa da Rota #${entregaId} foi concluída com sucesso.`
      );
    } catch (err) {
      toast.error('Erro na Baixa', err.message || 'Não foi possível registrar a entrega.');
    } finally {
      setConfirmando(false);
    }
  };

  const entregasPendentes = entregas.filter((e) => e.status === 'Pendente');
  const entregasConcluidas = entregas.filter((e) => e.status === 'Concluido');
  const nomeVoluntario = usuario.nome_completo || usuario.nome || 'Voluntário';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Cabeçalho da Escala */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Escala de Entregas da Última Milha
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
              Voluntário responsável: <strong className="text-stone-800">{nomeVoluntario}</strong>
            </p>
          </div>
          <button
            onClick={() => carregarEntregas(true)}
            disabled={loading}
            className="btn-secondary self-start sm:self-auto min-h-[46px]"
            aria-label="Atualizar lista de rotas da escala"
          >
            <IconRefresh className={`w-4 h-4 mr-2 ${loading ? 'animate-spin text-orange-600' : 'text-stone-500'}`} />
            <span>Atualizar Rotas</span>
          </button>
        </div>

        {/* Indicadores de Rota */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-stone-100">
          <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <IconClock className="w-4 h-4 text-amber-600" />
              <span>Pendentes Hoje</span>
            </div>
            <div className="text-2xl font-extrabold text-amber-950 mt-1">
              {entregasPendentes.length}
            </div>
          </div>

          <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <IconCheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Concluídas</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-950 mt-1">
              {entregasConcluidas.length}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && entregas.length === 0 && (
        <div className="card-surface p-12 text-center">
          <IconRefresh className="w-8 h-8 text-orange-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-stone-700">Sincronizando rotas com o servidor...</p>
        </div>
      )}

      {/* Lista Vazia */}
      {!loading && entregas.length === 0 && (
        <div className="card-surface p-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-stone-100 border border-stone-200 text-stone-400 flex items-center justify-center mb-3">
            <IconClipboardCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">Nenhuma rota atribuída</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Você não possui entregas pendentes no momento. Caso precise de uma rota, contate a coordenação na sede.
          </p>
        </div>
      )}

      {/* Cards de Entregas */}
      <div className="space-y-4">
        {entregas.map((entrega) => {
          const isConcluido = entrega.status === 'Concluido';
          const mapsUrl = entrega.link_gps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entrega.endereco_completo || '')}`;

          return (
            <div
              key={entrega.id_entrega}
              className={`rounded-2xl border transition-all duration-200 ${
                isConcluido
                  ? 'bg-stone-50/60 border-stone-200/90 shadow-none opacity-90'
                  : 'bg-white border-stone-200 shadow-sm hover:shadow-md'
              } p-5 sm:p-6`}
            >
              {/* Header do Card */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-200">
                    Rota #{entrega.id_entrega.toString().padStart(4, '0')}
                  </span>
                  
                  {isConcluido ? (
                    <span className="chip-badge bg-emerald-50 text-emerald-800 border-emerald-300">
                      <IconCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Concluída</span>
                    </span>
                  ) : (
                    <span className="chip-badge bg-amber-50 text-amber-900 border-amber-300">
                      <IconClock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pendente de Entrega</span>
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-stone-400">
                  Agendada: {entrega.data_agendada}
                </div>
              </div>

              {/* Informações da Família e Localização (RF04) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Beneficiário Responsável
                  </div>
                  <div className="text-base font-bold text-stone-900 mt-1">
                    {entrega.familia_nome}
                  </div>
                  {entrega.telefone_contato && (
                    <a
                      href={`tel:${entrega.telefone_contato.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-orange-600 mt-1 transition-colors"
                    >
                      <IconPhone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{entrega.telefone_contato}</span>
                    </a>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Endereço de Entrega
                  </div>
                  <div className="text-sm font-semibold text-stone-800 mt-1 flex items-start gap-1.5">
                    <IconMapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                    <span>{entrega.endereco_completo}</span>
                  </div>
                </div>
              </div>

              {/* Itens e Donativos a Descarregar */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Donativos para Entrega:
                </div>
                <div className="flex flex-wrap gap-2">
                  {entrega.itens?.map((it, idx) => (
                    <span
                      key={idx}
                      className="chip-badge bg-white text-stone-800 border-stone-300 shadow-2xs font-semibold text-xs"
                    >
                      <IconPackage className="w-3.5 h-3.5 text-orange-600" />
                      <span>{it.quantidade}x</span>
                      <span>{it.descricao_item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Ações com Touch Target Acessível (WCAG >= 46px) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-[46px]"
                  aria-label={`Abrir endereço no Google Maps para ${entrega.familia_nome}`}
                >
                  <IconNavigation className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Navegar no Google Maps</span>
                </a>

                {!isConcluido ? (
                  <button
                    type="button"
                    onClick={() => setEntregaParaConfirmar(entrega)}
                    className="btn-primary min-h-[46px]"
                  >
                    <IconCheckCircle className="w-4 h-4 mr-2" />
                    <span>Confirmar Entrega</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setComprovanteAtivo(entrega)}
                    className="btn-secondary min-h-[46px] border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                  >
                    <IconClipboardCheck className="w-4 h-4 mr-2 text-emerald-700" />
                    <span>Ver Recibo Digital</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modais */}
      {entregaParaConfirmar && (
        <ConfirmacaoModal
          entrega={entregaParaConfirmar}
          loading={confirmando}
          onConfirm={handleConcluir}
          onCancel={() => setEntregaParaConfirmar(null)}
        />
      )}

      {comprovanteAtivo && (
        <ComprovanteModal
          entrega={comprovanteAtivo}
          onClose={() => setComprovanteAtivo(null)}
        />
      )}

    </div>
  );
}
