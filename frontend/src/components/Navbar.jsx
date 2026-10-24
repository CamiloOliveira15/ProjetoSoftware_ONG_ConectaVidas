import React from 'react';
import { IconPackage, IconUser, IconLogOut, IconShield, IconTruck } from './Icons';

/**
 * Barra de Navegação Conecta Vidas (Branco Gelo + Laranja Solidário).
 * Topo comunitário limpo e fluido de ponta a ponta, sem fundo bege.
 */
export default function Navbar({ usuario, onLogout, abaAtiva, setAbaAtiva }) {
  const isCoordenador = usuario?.perfil === 'COORDENADOR';
  const nomeExibicao = usuario?.nome_completo || usuario?.nome || 'Usuário';

  return (
    <header className="sticky top-0 z-40 bg-[#f8fafc]/95 backdrop-blur-md border-b border-slate-200 transition-colors w-full">
      <div className="w-full px-6 sm:px-10 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Identidade Visual Comunitária */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-700 text-white flex items-center justify-center shadow-xs btn-tactile flex-shrink-0">
            <IconPackage className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                Conecta Vidas
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200">
                ODS 2.1
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Associação Comunitária Pão e Vida • Logística Solidária
            </p>
          </div>
        </div>

        {/* Segmented Control para Alternância de Visão */}
        {usuario && isCoordenador && setAbaAtiva && (
          <div className="segmented-control" role="tablist" aria-label="Alternar modo de visualização">
            <button
              type="button"
              role="tab"
              aria-selected={abaAtiva === 'principal'}
              onClick={() => setAbaAtiva('principal')}
              className={`segmented-item inline-flex items-center gap-2 min-h-[36px] px-3.5 btn-tactile ${
                abaAtiva === 'principal' ? 'segmented-item-active' : ''
              }`}
            >
              <IconShield className="w-4 h-4 text-orange-700" />
              <span>Central da Sede</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={abaAtiva === 'campo'}
              onClick={() => setAbaAtiva('campo')}
              className={`segmented-item inline-flex items-center gap-2 min-h-[36px] px-3.5 btn-tactile ${
                abaAtiva === 'campo' ? 'segmented-item-active' : ''
              }`}
            >
              <IconTruck className="w-4 h-4 text-orange-700" />
              <span>Visão de Campo</span>
            </button>
          </div>
        )}

        {/* Perfil do Usuário e Logout */}
        {usuario && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900">
                {nomeExibicao}
              </div>
              <div className="text-xs text-slate-500">
                {usuario.email}
              </div>
            </div>

            {/* Badge de Perfil */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                isCoordenador
                  ? 'bg-orange-50 text-orange-900 border-orange-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <IconUser className="w-3.5 h-3.5 text-slate-600" />
              <span>{isCoordenador ? 'Coordenação Geral' : 'Voluntário'}</span>
            </span>

            {/* Botão de Logout */}
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center min-h-[38px] px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-semibold btn-tactile"
              aria-label="Encerrar sessão no sistema"
            >
              <IconLogOut className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
