import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import {
  IconPackage,
  IconSend,
  IconRefresh,
  IconClipboardCheck,
  IconAlertTriangle,
  IconSearch,
  IconNavigation,
} from './Icons';

/**
 * Painel de Coordenação Geral — Conecta Vidas.
 * Design limpo em Branco Gelo (Slate-50), tipografia proporcional, foco estrito em operação e zero cartões supérfluos.
 */
export default function CoordenadorView({ usuario }) {
  const [estoque, setEstoque] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  // Filtros da Tabela de Entregas
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos', 'Pendente', 'Concluido'

  // Formulário de Despacho
  const [formVoluntarioId, setFormVoluntarioId] = useState('');
  const [formFamiliaId, setFormFamiliaId] = useState('');
  const [formItemId, setFormItemId] = useState('');
  const [formQuantidade, setFormQuantidade] = useState(1);

  const carregarDados = async (mostrarToast = false) => {
    setLoading(true);
    try {
      const [estData, volData, famData, entData] = await Promise.all([
        api.getEstoque(),
        api.getVoluntarios(),
        api.getFamilias(),
        api.getEntregas(),
      ]);
      setEstoque(estData);
      setVoluntarios(volData);
      setFamilias(famData);
      setEntregas(entData);

      if (volData.length > 0 && !formVoluntarioId) setFormVoluntarioId(volData[0].id_voluntario);
      if (famData.length > 0 && !formFamiliaId) setFormFamiliaId(famData[0].id_familia);
      if (estData.length > 0 && !formItemId) setFormItemId(estData[0].id_item);

      if (mostrarToast) {
        toast.info('Dados Atualizados', 'Estoque e rotas sincronizados com sucesso.');
      }
    } catch (err) {
      toast.error('Erro de Conexão', err.message || 'Falha ao sincronizar dados da sede.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const itemSelecionado = estoque.find((e) => e.id_item === Number(formItemId));
  const saldoInsuficiente = itemSelecionado && formQuantidade > itemSelecionado.quantidade_disponivel;

  const handleCriarEntrega = async (e) => {
    e.preventDefault();

    if (!formVoluntarioId || !formFamiliaId || !formItemId) {
      toast.warning('Campos Incompletos', 'Preencha voluntário, família e donativo para despachar a rota.');
      return;
    }

    if (formQuantidade <= 0) {
      toast.warning('Quantidade Inválida', 'A quantidade deve ser de no mínimo 1 unidade.');
      return;
    }

    if (saldoInsuficiente) {
      toast.error(
        'Estoque Insuficiente',
        `Saldo atual de "${itemSelecionado.descricao_item}" é de apenas ${itemSelecionado.quantidade_disponivel} unidade(s).`
      );
      return;
    }

    setSubmitting(true);
    try {
      const novaEntrega = await api.criarEntrega({
        id_voluntario: Number(formVoluntarioId),
        id_familia: Number(formFamiliaId),
        demandas: [
          {
            id_item: Number(formItemId),
            quantidade: Number(formQuantidade),
          },
        ],
      });

      toast.success(
        'Rota Despachada',
        `Rota #${novaEntrega.id_entrega} criada com sucesso! O estoque foi debitado atomicamente.`
      );
      setFormQuantidade(1);
      await carregarDados();
    } catch (err) {
      toast.error('Falha no Despacho', err.message || 'Erro ao registrar rota.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtragem Reativa das Entregas
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
      const matchVol = (ent.voluntario_nome || '').toLowerCase().includes(t);
      return matchId || matchFam || matchEnd || matchVol;
    });
  }, [entregas, termoBusca, filtroStatus]);

  const pendentesCount = entregas.filter((e) => e.status === 'Pendente').length;
  const concluidasCount = entregas.filter((e) => e.status === 'Concluido').length;

  return (
    <div className="space-y-6 animate-fade-in w-full">

      {/* 1. Cabeçalho Typográfico Limpo e Proporcional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Coordenação Operacional & Entregas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Associação Comunitária Pão e Vida • Gestão de estoque da sede e despacho de rotas em tempo real.
          </p>
        </div>

        <button
          onClick={() => carregarDados(true)}
          disabled={loading}
          className="btn-secondary self-start sm:self-auto min-h-[42px] text-xs font-semibold"
          aria-label="Sincronizar estoque e entregas"
        >
          <IconRefresh className={`w-4 h-4 mr-2 ${loading ? 'animate-spin text-orange-700' : 'text-slate-500'}`} />
          <span>Sincronizar Dados</span>
        </button>
      </div>

      {/* 2. Área Operacional Direta em 2 Colunas Fluidas (Sem cartões decorativos inúteis) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        
        {/* Coluna Esquerda: Tabela de Entregas da Comunidade (8 de 12 colunas) */}
        <section className="lg:col-span-8 card-surface overflow-hidden" aria-label="Histórico de Entregas da Comunidade">
          
          {/* Header da Tabela com Filtros Integrados */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <IconClipboardCheck className="w-5 h-5 text-orange-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Rotas de Entrega da Comunidade
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 tabular-nums">
                  {entregasFiltradas.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Rastreabilidade de baixa em campo com minimização de dados LGPD.
              </p>
            </div>

            {/* Segmented Filter Pills */}
            <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-200/80 p-1 rounded-xl">
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
                Pendentes ({pendentesCount})
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
                Concluídas ({concluidasCount})
              </button>
            </div>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <div className="relative">
              <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por código de rota, família, endereço ou voluntário..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/60 text-slate-900 placeholder-slate-500 focus:bg-white focus:border-orange-700 focus:ring-1 focus:ring-orange-700 transition-colors"
                aria-label="Campo de busca de rotas"
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
          </div>

          {/* Tabela de Entregas com Tipografia Proporcional */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-2.5 px-4 w-16">Rota</th>
                  <th className="py-2.5 px-4">Beneficiário & Endereço</th>
                  <th className="py-2.5 px-4">Voluntário</th>
                  <th className="py-2.5 px-4">Donativos</th>
                  <th className="py-2.5 px-4 w-28">Status</th>
                  <th className="py-2.5 px-4 text-center w-16">GPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entregasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500">
                      <p className="text-sm font-semibold text-slate-700">Nenhuma entrega encontrada</p>
                      <p className="text-xs text-slate-500 mt-1">Ajuste o termo de busca ou filtros de status.</p>
                    </td>
                  </tr>
                ) : (
                  entregasFiltradas.map((e) => {
                    const isConcluido = e.status === 'Concluido';
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      e.endereco_completo || ''
                    )}`;

                    return (
                      <tr key={e.id_entrega} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-800 tabular-nums">
                          #{e.id_entrega.toString().padStart(4, '0')}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900 max-w-[280px]">
                          <div className="font-semibold text-slate-900">{e.familia_nome}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{e.endereco_completo}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">
                          {e.voluntario_nome}
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {e.itens?.map((it, idx) => (
                              <span
                                key={idx}
                                className="inline-block mr-1.5 px-2 py-0.5 bg-slate-100 text-slate-800 font-medium rounded text-xs border border-slate-200"
                              >
                                {it.quantidade}x {it.descricao_item}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              isConcluido
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : 'bg-amber-50 text-amber-900 border-amber-300'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isConcluido ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                            <span>{isConcluido ? 'Concluída' : 'Pendente'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 text-slate-500 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Abrir rota no Google Maps"
                            aria-label={`Abrir destino de ${e.familia_nome} no Google Maps`}
                          >
                            <IconNavigation className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coluna Direita: Despacho Rápido & Saldo do Armazém (4 de 12 colunas) */}
        <section className="lg:col-span-4 card-surface p-5 sm:p-6" aria-label="Despachar Nova Rota">
          <div className="flex items-center gap-2 mb-1">
            <IconSend className="w-5 h-5 text-orange-700" />
            <h2 className="text-base font-bold text-slate-900">
              Despachar Nova Rota de Entrega
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Associe um voluntário ativo a uma família cadastrada e debite os donativos do estoque comunitário.
          </p>

          {/* Saldo de Estoque Compacto e Direto (Inline, sem cards decorativos soltos) */}
          <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-600 mb-1.5">
              Saldo Físico no Armazém da Sede:
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {estoque.map((it) => (
                <div key={it.id_item} className="p-1.5 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 tabular-nums">{it.quantidade_disponivel} un</div>
                  <div className="text-[11px] text-slate-500 truncate" title={it.descricao_item}>{it.descricao_item}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleCriarEntrega} className="space-y-3.5">
            
            {/* Seleção do Voluntário */}
            <div>
              <label htmlFor="select-voluntario" className="block text-xs font-semibold text-slate-700 mb-1">
                Voluntário de Rota
              </label>
              <select
                id="select-voluntario"
                value={formVoluntarioId}
                onChange={(e) => setFormVoluntarioId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs font-medium focus:border-orange-700 focus:ring-1 focus:ring-orange-700"
              >
                {voluntarios.map((v) => (
                  <option key={v.id_voluntario} value={v.id_voluntario}>
                    {v.nome_completo} ({v.perfil})
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção da Família */}
            <div>
              <label htmlFor="select-familia" className="block text-xs font-semibold text-slate-700 mb-1">
                Família Beneficiária
              </label>
              <select
                id="select-familia"
                value={formFamiliaId}
                onChange={(e) => setFormFamiliaId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs font-medium focus:border-orange-700 focus:ring-1 focus:ring-orange-700"
              >
                {familias.map((f) => (
                  <option key={f.id_familia} value={f.id_familia}>
                    {f.nome_responsavel} ({f.quantidade_membros} membros)
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção do Donativo */}
            <div>
              <label htmlFor="select-donativo" className="block text-xs font-semibold text-slate-700 mb-1">
                Donativo da Sede
              </label>
              <select
                id="select-donativo"
                value={formItemId}
                onChange={(e) => setFormItemId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs font-medium focus:border-orange-700 focus:ring-1 focus:ring-orange-700"
              >
                {estoque.map((it) => (
                  <option key={it.id_item} value={it.id_item}>
                    {it.descricao_item} (Disponível: {it.quantidade_disponivel} un)
                  </option>
                ))}
              </select>
            </div>

            {/* Quantidade */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="input-quantidade" className="text-xs font-semibold text-slate-700">
                  Quantidade
                </label>
                {itemSelecionado && (
                  <span className="text-xs text-slate-500">
                    Disponível: <strong className="text-slate-800 tabular-nums">{itemSelecionado.quantidade_disponivel} un</strong>
                  </span>
                )}
              </div>
              <input
                id="input-quantidade"
                type="number"
                min="1"
                max={itemSelecionado?.quantidade_disponivel || 99}
                value={formQuantidade}
                onChange={(e) => setFormQuantidade(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs font-medium focus:border-orange-700 focus:ring-1 focus:ring-orange-700"
              />
            </div>

            {saldoInsuficiente && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-900 text-xs rounded-xl flex items-center gap-2">
                <IconAlertTriangle className="w-4 h-4 text-rose-700 flex-shrink-0" />
                <span>
                  Quantidade ({formQuantidade}) maior que o estoque ({itemSelecionado.quantidade_disponivel}).
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || saldoInsuficiente}
              className="w-full btn-primary min-h-[44px] mt-2 text-xs font-semibold"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Debitando Estoque...</span>
                </>
              ) : (
                <>
                  <IconSend className="w-4 h-4 mr-2" />
                  <span>Despachar Rota de Entrega</span>
                </>
              )}
            </button>
          </form>
        </section>

      </div>

    </div>
  );
}
