import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import ConfirmacaoModal from './ConfirmacaoModal';
import ComprovanteModal from './ComprovanteModal';
import {
  IconPackage,
  IconMapPin,
  IconNavigation,
  IconPhone,
  IconCheckCircle,
  IconRefresh,
  IconClipboardCheck,
  IconSearch,
  IconTruck,
} from './Icons';

/**
 * Painel de Escalas e Rotas de Entrega do Voluntário (RF02 / RF04).
 * Design limpo em Branco Gelo, tipografia proporcional, foco no voluntário e alvos de toque acessíveis (>= 44px).
 */
export default function EscalaView({ usuario }) {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entregaParaConfirmar, setEntregaParaConfirmar] = useState(null);
  const [comprovanteAtivo, setComprovanteAtivo] = useState(null);
  const [confirmando, setConfirmando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos', 'Pendente', 'Concluido'
  const [termoBusca, setTermoBusca] = useState('');
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

  const entregasFiltradas = useMemo(() => {
    return entregas.filter((ent) => {
      if (filtroStatus !== 'todos' && ent.status !== filtroStatus) {
        return false;
      }
      if (!termoBusca.trim()) return true;
      const t = termoBusca.toLowerCase();
      const matchId = ent.id_entrega.toString().includes(t);
      const matchFam = (ent.familia_nome || '').toLowerCase().includes(t);
      const matchEnd = (ent.endereco_completo || '').toLowerCase().includes(t);
      return matchId || matchFam || matchEnd;
    });
  }, [entregas, termoBusca, filtroStatus]);

  return (
    <div className="space-y-6 animate-fade-in w-full">
      
      {/* 1. Cabeçalho Typográfico Limpo e Proporcional */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
              <IconTruck className="w-5 h-5 text-orange-700" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Escala de Entregas da Última Milha
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Voluntário em campo: <strong className="text-slate-800">{nomeVoluntario}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setFiltroStatus('todos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filtroStatus === 'todos'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({entregas.length})
            </button>
            <button
              type="button"
              onClick={() => setFiltroStatus('Pendente')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filtroStatus === 'Pendente'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pendentes ({entregasPendentes.length})
            </button>
            <button
              type="button"
              onClick={() => setFiltroStatus('Concluido')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filtroStatus === 'Concluido'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Concluídas ({entregasConcluidas.length})
            </button>
          </div>

          <button
            onClick={() => carregarEntregas(true)}
            disabled={loading}
            className="btn-secondary min-h-[42px] text-xs font-semibold"
            aria-label="Atualizar lista de rotas"
          >
            <IconRefresh className={`w-4 h-4 mr-2 ${loading ? 'animate-spin text-orange-700' : 'text-slate-500'}`} />
            <span>Sincronizar</span>
          </button>
        </div>
      </div>

      {/* 2. Campo de Busca Amplo */}
      <div className="relative w-full">
        <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por código de rota #ID, família beneficiária ou logradouro..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-orange-700 focus:ring-1 focus:ring-orange-700 transition-colors shadow-sm"
        />
        {termoBusca && (
          <button
            onClick={() => setTermoBusca('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && entregas.length === 0 && (
        <div className="card-surface p-12 text-center w-full">
          <IconRefresh className="w-8 h-8 text-orange-700 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Sincronizando rotas com a sede...</p>
        </div>
      )}

      {/* Lista Vazia */}
      {!loading && entregasFiltradas.length === 0 && (
        <div className="card-surface p-12 text-center w-full">
          <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-3">
            <IconClipboardCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Nenhuma rota encontrada</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {termoBusca || filtroStatus !== 'todos'
              ? 'Nenhum resultado corresponde aos filtros selecionados.'
              : 'Você não possui rotas atribuídas no momento. Caso precise de uma rota, contate a coordenação.'}
          </p>
        </div>
      )}

      {/* 3. Grade de Cartões de Rota Limpos (Sem caixas aninhadas desnecessárias) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {entregasFiltradas.map((entrega) => {
          const isConcluido = entrega.status === 'Concluido';
          const mapsUrl = entrega.link_gps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entrega.endereco_completo || '')}`;

          return (
            <div
              key={entrega.id_entrega}
              className={`rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                isConcluido
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-white border-slate-200 shadow-sm hover:border-orange-300'
              } p-5`}
            >
              <div>
                {/* Header do Card com Monospace ID e Status Pill */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 tabular-nums">
                    Rota #{entrega.id_entrega.toString().padStart(4, '0')}
                  </span>
                  
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      isConcluido
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isConcluido ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                    <span>{isConcluido ? 'Concluída' : 'Pendente'}</span>
                  </span>
                </div>

                {/* Dados da Família Beneficiária */}
                <div className="space-y-1 mb-3.5">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {entrega.familia_nome}
                  </h2>
                  {entrega.telefone_contato && (
                    <a
                      href={`tel:${entrega.telefone_contato.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-orange-700 transition-colors"
                    >
                      <IconPhone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{entrega.telefone_contato}</span>
                    </a>
                  )}
                  <p className="text-xs text-slate-600 font-medium flex items-start gap-1.5 pt-1">
                    <IconMapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{entrega.endereco_completo}</span>
                  </p>
                </div>

                {/* Donativos da Rota */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    Donativos a Entregar:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {entrega.itens?.map((it, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-800 font-medium rounded-lg text-xs border border-slate-200"
                      >
                        <IconPackage className="w-3.5 h-3.5 text-orange-700" />
                        <strong>{it.quantidade}x</strong> {it.descricao_item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ações com Alvos de Toque Acessíveis (WCAG AA >= 44px) */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-[44px] flex-1 text-center text-xs font-semibold"
                  aria-label={`Abrir endereço no Google Maps para ${entrega.familia_nome}`}
                >
                  <IconNavigation className="w-3.5 h-3.5 mr-1.5 text-blue-700" />
                  <span>Navegar GPS</span>
                </a>

                {!isConcluido ? (
                  <button
                    type="button"
                    onClick={() => setEntregaParaConfirmar(entrega)}
                    className="btn-primary min-h-[44px] flex-1 text-xs font-semibold"
                  >
                    <IconCheckCircle className="w-4 h-4 mr-1.5" />
                    <span>Confirmar</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setComprovanteAtivo(entrega)}
                    className="btn-secondary min-h-[44px] flex-1 border-emerald-300 text-emerald-900 hover:bg-emerald-50 text-xs font-semibold"
                  >
                    <IconClipboardCheck className="w-4 h-4 mr-1.5 text-emerald-700" />
                    <span>Ver Recibo</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modais de Confirmação e Recibo */}
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
