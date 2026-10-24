import React from 'react';
import { IconPackage, IconUser, IconLogOut, IconShield, IconTruck } from './Icons';

/**
 * Barra de Navegação Oficial — Design System Conecta Vidas.
 * Zero emojis, ícones vetoriais SVG de precisão e alto contraste WCAG 2.1 AA.
 */
export default function Navbar({ usuario, onLogout, abaAtiva, setAbaAtiva }) {
  const isCoordenador = usuario?.perfil === 'COORDENADOR';
  const nomeExibicao = usuario?.nome_completo || usuario?.nome || 'Usuário';

  return (
    <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-stone-900/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Identidade Visual Institucional */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
            <IconPackage className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white leading-none">
                Conecta Vidas
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                ODS 2.1
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Associação Comunitária Pão e Vida • Logística Humanitária
            </p>
          </div>
        </div>

        {/* Switcher de Visão de Demonstração (Exclusivo para Coordenador) */}
        {usuario && isCoordenador && setAbaAtiva && (
          <div className="inline-flex p-1 rounded-xl bg-stone-800 border border-stone-700/80">
            <button
              type="button"
              onClick={() => setAbaAtiva('principal')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                abaAtiva === 'principal'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <IconShield className="w-4 h-4" />
              <span>Painel da Sede</span>
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva('campo')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                abaAtiva === 'campo'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <IconTruck className="w-4 h-4" />
              <span>Visão de Campo</span>
            </button>
          </div>
        )}

        {/* Perfil do Usuário e Logout */}
        {usuario && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-stone-100 flex items-center justify-end gap-1.5">
                <span>{nomeExibicao}</span>
              </div>
              <div className="text-xs text-stone-400">
                {usuario.email}
              </div>
            </div>

            {/* Badge de Perfil com Ícone SVG */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isCoordenador
                  ? 'bg-purple-950/70 text-purple-200 border-purple-700/60'
                  : 'bg-emerald-950/70 text-emerald-200 border-emerald-700/60'
              }`}
            >
              <IconUser className="w-3.5 h-3.5" />
              <span>{isCoordenador ? 'Coordenação' : 'Voluntário de Rota'}</span>
            </span>

            {/* Botão de Encerramento de Sessão */}
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center min-h-[46px] px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              aria-label="Encerrar sessão no sistema"
            >
              <IconLogOut className="w-4 h-4 mr-1.5" />
              <span>Sair</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
