import React, { useState } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import { IconPackage, IconLock, IconUser, IconShield, IconAlertTriangle } from './Icons';

/**
 * Tela de Autenticação Segura — Design System Conecta Vidas.
 * Sem emojis, com rótulos persistentes WCAG 2.1 AA e notificações in-app nativas.
 */
export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEsqueciSenha, setShowEsqueciSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4 sm:p-6 bg-slate-50/80">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200/90 shadow-md p-6 sm:p-8">
        
        {/* Cabeçalho do Card */}
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 items-center justify-center mb-3.5 shadow-sm">
            <IconPackage className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Acesso ao Sistema
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            Gestão de Estoque Físico e Roteirização Humanitária
          </p>
        </div>

        {/* Formulário Principal */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
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
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 bg-white placeholder-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors text-sm font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => setShowEsqueciSenha(true)}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline min-h-[30px] flex items-center"
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
                className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-300 text-stone-900 bg-white placeholder-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-700 rounded-lg focus-visible:outline-2 focus-visible:outline-orange-500"
                aria-label={showPassword ? 'Ocultar senha em texto puro' : 'Exibir senha em texto puro'}
              >
                <IconLock className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl font-bold text-sm text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50"
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

        {/* Modal de Recuperação de Senha */}
        {showEsqueciSenha && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recuperacao-title"
          >
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-stone-200 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <IconLock className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="recuperacao-title" className="text-base font-bold text-stone-900">
                    Recuperação de Acesso
                  </h3>
                  <p className="text-xs text-stone-500">Diretriz de Segurança e LGPD</p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-2">
                <p>
                  Por determinação de segurança operacional e proteção de dados comunitários, redefinições de credenciais são emitidas presencialmente pela <strong>Coordenação Geral</strong> na sede.
                </p>
                <p>
                  Canal oficial de suporte: <span className="font-semibold text-orange-700">maria.coordenadora@conectavidas.org</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEsqueciSenha(false)}
                className="w-full min-h-[46px] rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors"
              >
                Voltar para o Login
              </button>
            </div>
          </div>
        )}

        {/* Seção Pedagógica: Perfis Pré-configurados de Homologação */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 text-center mb-3">
            Perfis de Demonstração Homologados
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('maria.coordenadora@conectavidas.org', 'admin123')}
              className="min-h-[46px] p-3 rounded-xl border border-stone-200 bg-stone-50/80 hover:bg-stone-100/90 text-stone-800 text-left transition-all flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-purple-600"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                <IconShield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Maria Silva</div>
                <div className="text-[11px] text-stone-500">Coordenação Geral</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('joao.voluntario@conectavidas.org', '12345678')}
              className="min-h-[46px] p-3 rounded-xl border border-stone-200 bg-stone-50/80 hover:bg-stone-100/90 text-stone-800 text-left transition-all flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                <IconUser className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">João Batista</div>
                <div className="text-[11px] text-stone-500">Voluntário de Rota</div>
              </div>
            </button>
          </div>
        </div>

        {/* Governança Ética e LGPD */}
        <div className="mt-6 text-center text-[11px] text-stone-400 leading-relaxed">
          <p>
            Alinhamento estrito ao <strong>ODS 2: Fome Zero</strong> e <strong>LGPD (Lei nº 13.709/2018)</strong>. Sem armazenamento de documentos sensíveis (CPF/RG).
          </p>
        </div>

      </div>
    </div>
  );
}
