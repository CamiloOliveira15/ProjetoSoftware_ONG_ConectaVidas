import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import { IconPackage, IconLock, IconUser, IconShield, IconX } from './Icons';

/**
 * Tela de Autenticação Segura — Conecta Vidas.
 * Design limpo em Branco Gelo (Slate-50), fecho de modal por clique externo/ESC e sem emojis.
 */
export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEsqueciSenha, setShowEsqueciSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showEsqueciSenha) {
        setShowEsqueciSenha(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showEsqueciSenha]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password) {
      toast.warning('Campos Obrigatórios', 'Por favor, informe seu e-mail institucional e sua senha.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.login(email, password);
      toast.success('Acesso Autorizado', `Bem-vindo(a), ${data.usuario.nome_completo}!`);
      onLoginSuccess(data.usuario);
    } catch (err) {
      toast.error('Falha na Autenticação', err.message || 'E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (quickEmail, quickPassword) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setLoading(true);
    api.login(quickEmail, quickPassword)
      .then((data) => {
        toast.success('Demonstração Ativa', `Sessão iniciada como ${data.usuario.nome_completo}.`);
        onLoginSuccess(data.usuario);
      })
      .catch((err) => {
        toast.error('Erro de Acesso', err.message || 'Falha ao autenticar credencial de teste.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc]">
      
      {/* Painel Esquerdo: Identidade Institucional e Missão Humanitária (50% da tela) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-slate-100 p-12 xl:p-16 flex-col justify-between relative overflow-hidden border-r border-slate-800">
        
        {/* Glow de fundo sutil */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 mb-8">
            <IconPackage className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Associação Comunitária Pão e Vida • ACPV
            </span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight max-w-lg">
            Logística Humanitária e Gestão de Alimentos da Última Milha.
          </h1>

          <p className="text-base text-slate-300 mt-4 leading-relaxed max-w-md">
            Plataforma comunitária para despacho de donativos, controle de estoque da sede e roteirização segura para voluntários de campo.
          </p>
        </div>

        {/* Indicadores de Impacto Social */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
          <div>
            <div className="text-2xl xl:text-3xl font-bold text-white tracking-tight tabular-nums">1.840 kg</div>
            <div className="text-xs text-slate-400 mt-0.5">Alimentos Despachados</div>
          </div>
          <div>
            <div className="text-2xl xl:text-3xl font-bold text-white tracking-tight tabular-nums">85</div>
            <div className="text-xs text-slate-400 mt-0.5">Famílias Assistidas</div>
          </div>
          <div>
            <div className="text-2xl xl:text-3xl font-bold text-orange-400 tracking-tight">ODS 2.1</div>
            <div className="text-xs text-slate-400 mt-0.5">Fome Zero & Nutrição</div>
          </div>
        </div>

        {/* Rodapé Institucional */}
        <div className="relative z-10 text-xs text-slate-400">
          <p>Projeto de Software • CST em Análise e Desenvolvimento de Sistemas • Cruzeiro do Sul Virtual</p>
        </div>
      </div>

      {/* Painel Direito: Formulário de Autenticação (50% da tela) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-16">
        <div className="w-full max-w-md space-y-6">
          
          <div>
            <div className="lg:hidden inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
              <IconPackage className="w-4 h-4 text-orange-700" />
              <span>ONG Conecta Vidas</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Acesso ao Sistema
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Informe suas credenciais ou selecione um perfil de homologação abaixo.
            </p>
          </div>

          {/* Formulário Principal */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                E-mail Institucional
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@conectavidas.org"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-500 focus:border-orange-700 focus:ring-1 focus:ring-orange-700 transition-colors text-sm font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Senha de Acesso
                </label>
                <button
                  type="button"
                  onClick={() => setShowEsqueciSenha(true)}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 hover:underline min-h-[30px] flex items-center"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Informe sua credencial"
                  className="w-full px-3.5 py-2.5 pr-12 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-500 focus:border-orange-700 focus:ring-1 focus:ring-orange-700 transition-colors text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-800 rounded-lg focus-visible:outline-2 focus-visible:outline-orange-600"
                  aria-label={showPassword ? 'Ocultar senha em texto puro' : 'Exibir senha em texto puro'}
                >
                  <IconLock className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-orange-700 hover:bg-orange-800 active:bg-orange-900 transition-all shadow-xs flex items-center justify-center gap-2 btn-tactile focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar no Sistema</span>
              )}
            </button>
          </form>

          {/* Modal de Recuperação de Senha (Fecha ao clicar fora ou pressionar ESC) */}
          {showEsqueciSenha && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
              role="dialog"
              aria-modal="true"
              aria-labelledby="recuperacao-title"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowEsqueciSenha(false);
                }
              }}
            >
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 relative">
                
                <button
                  type="button"
                  onClick={() => setShowEsqueciSenha(false)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Fechar janela"
                >
                  <IconX className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center flex-shrink-0">
                    <IconLock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="recuperacao-title" className="text-base font-bold text-slate-900">
                      Recuperação de Acesso
                    </h3>
                    <p className="text-xs text-slate-500">Diretriz de Segurança e LGPD</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    Por determinação de segurança operacional e proteção de dados comunitários, redefinições de credenciais são emitidas presencialmente pela <strong>Coordenação Geral</strong> na sede.
                  </p>
                  <p>
                    Canal oficial de suporte: <span className="font-semibold text-orange-800">maria.coordenadora@conectavidas.org</span>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEsqueciSenha(false)}
                  className="w-full min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors btn-tactile"
                >
                  Voltar para o Login
                </button>
              </div>
            </div>
          )}

          {/* Seção de Demonstração Homologada */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 text-center mb-2.5">
              Perfis de Demonstração Homologados
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('maria.coordenadora@conectavidas.org', 'admin123')}
                className="min-h-[44px] p-3 rounded-xl border border-slate-200 bg-white hover:bg-orange-50/50 hover:border-orange-300 text-slate-800 text-left transition-all flex items-center gap-3 group btn-tactile shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                  <IconShield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Coordenação</div>
                  <div className="text-[11px] text-slate-500">maria.coordenadora</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('joao.silva@conectavidas.org', '12345678')}
                className="min-h-[44px] p-3 rounded-xl border border-slate-200 bg-white hover:bg-orange-50/50 hover:border-orange-300 text-slate-800 text-left transition-all flex items-center gap-3 group btn-tactile shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                  <IconUser className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Voluntário</div>
                  <div className="text-[11px] text-slate-500">joao.silva</div>
                </div>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-600 font-medium">
            Associação Comunitária Pão e Vida (ACPV) • ODS 2.1 Fome Zero
          </div>

        </div>
      </div>

    </div>
  );
}
