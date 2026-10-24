import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import {
  IconPackage,
  IconSparkles,
  IconBuilding,
  IconSend,
  IconRefresh,
  IconClipboardCheck,
  IconCheckCircle,
  IconClock,
  IconAlertTriangle,
  IconUser,
  IconUsers,
} from './Icons';

/**
 * Painel da Coordenação Geral (RF01).
 * Gerenciamento de estoque físico, montagem de rotas e débito atômico.
 * Sem emojis, com ícones vetoriais SVG e notificações personalizadas in-app.
 */
export default function CoordenadorView({ usuario }) {
  const [estoque, setEstoque] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  // Estado do formulário de despacho
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
      toast.error('Erro de Conexão', err.message || 'Falha ao sincronizar dados da coordenação.');
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

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      
      {/* Cabeçalho do Painel da Coordenação */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconBuilding className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Central de Coordenação Operacional
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium">
                Gestão de estoque físico na sede, alocação de rotas e despacho de donativos.
              </p>
            </div>
          </div>

          <button
            onClick={() => carregarDados(true)}
            disabled={loading}
            className="btn-secondary min-h-[46px] self-start sm:self-auto"
            aria-label="Sincronizar estoque e entregas"
          >
            <IconRefresh className={`w-4 h-4 mr-2 ${loading ? 'animate-spin text-orange-600' : 'text-stone-500'}`} />
            <span>Sincronizar Dados</span>
          </button>
        </div>
      </div>

      {/* 1. Visão de Estoque Físico em Tempo Real (RF01) */}
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <IconPackage className="w-5 h-5 text-stone-600" />
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            Estoque Físico Disponível na Sede
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {estoque.map((item) => {
            const isBaixo = item.quantidade_disponivel < 10;
            return (
              <div
                key={item.id_item}
                className="card-surface p-5 flex flex-col justify-between hover:border-stone-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-stone-400">
                      ID #{item.id_item.toString().padStart(3, '0')}
                    </span>
                    <span
                      className={`chip-badge text-[11px] ${
                        isBaixo
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      {isBaixo ? (
                        <>
                          <IconAlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Saldo Crítico</span>
                        </>
                      ) : (
                        <>
                          <IconCheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Disponível</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 mt-2.5">
                    {item.descricao_item}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {item.perecivel ? 'Alimento perecível (despacho prioritário)' : 'Material de higiene não perecível'}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-stone-500">Saldo Atual:</span>
                  <span className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    {item.quantidade_disponivel} <span className="text-xs font-normal text-stone-400">unid</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Formulário de Montagem e Despacho de Rota (RF01) */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <IconSend className="w-5 h-5 text-orange-600" />
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            Despachar Nova Rota de Entrega
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-5">
          Associe um voluntário ativo a uma família cadastrada e debite os donativos do estoque atomicamente.
        </p>

        <form onSubmit={handleCriarEntrega} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Seleção do Voluntário */}
            <div>
              <label htmlFor="select-voluntario" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Voluntário de Rota
              </label>
              <select
                id="select-voluntario"
                value={formVoluntarioId}
                onChange={(e) => setFormVoluntarioId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
              <label htmlFor="select-familia" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Beneficiário Cadastrado
              </label>
              <select
                id="select-familia"
                value={formFamiliaId}
                onChange={(e) => setFormFamiliaId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
              <label htmlFor="select-donativo" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Donativo a Despachar
              </label>
              <select
                id="select-donativo"
                value={formItemId}
                onChange={(e) => setFormItemId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                {estoque.map((it) => (
                  <option key={it.id_item} value={it.id_item}>
                    {it.descricao_item} (Disponível: {it.quantidade_disponivel})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantidade */}
            <div>
              <label htmlFor="input-quantidade" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Quantidade
              </label>
              <input
                id="input-quantidade"
                type="number"
                min="1"
                max={itemSelecionado?.quantidade_disponivel || 99}
                value={formQuantidade}
                onChange={(e) => setFormQuantidade(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white text-sm font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

          </div>

          {saldoInsuficiente && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <IconAlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>
                Quantidade solicitada ({formQuantidade}) superior ao estoque disponível ({itemSelecionado.quantidade_disponivel}).
              </span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting || saldoInsuficiente}
              className="btn-primary min-h-[46px]"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Registrando e Debitando Estoque...</span>
                </>
              ) : (
                <>
                  <IconSend className="w-4 h-4 mr-2" />
                  <span>Despachar Rota de Entrega</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Tabela Histórica de Entregas e Rotas */}
      <div className="card-surface p-5 sm:p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <IconClipboardCheck className="w-5 h-5 text-stone-600" />
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            Histórico Geral de Entregas
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-3">Rota #</th>
                <th className="py-3 px-3">Beneficiário</th>
                <th className="py-3 px-3">Voluntário</th>
                <th className="py-3 px-3">Itens Despachados</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {entregas.map((e) => {
                const isConcluido = e.status === 'Concluido';
                return (
                  <tr key={e.id_entrega} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-stone-800">
                      #{e.id_entrega.toString().padStart(4, '0')}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      <div>{e.familia_nome}</div>
                      <div className="text-[11px] text-stone-400 font-normal">{e.endereco_completo}</div>
                    </td>
                    <td className="py-3 px-3 text-stone-700 font-medium">
                      {e.voluntario_nome}
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        {e.itens?.map((it, idx) => (
                          <div key={idx} className="font-medium text-stone-700">
                            {it.quantidade}x {it.descricao_item}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`chip-badge text-[10px] ${
                          isConcluido
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-900 border-amber-300'
                        }`}
                      >
                        {isConcluido ? (
                          <>
                            <IconCheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Concluída</span>
                          </>
                        ) : (
                          <>
                            <IconClock className="w-3 h-3 text-amber-600" />
                            <span>Pendente</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-400 font-mono">
                      {e.data_agendada}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
