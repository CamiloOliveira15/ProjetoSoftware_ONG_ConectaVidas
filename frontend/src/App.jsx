import React, { useState, useEffect } from 'react';
import { api } from './api';
import { ToastProvider, useToast, useToastState } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import EscalaView from './components/EscalaView';
import CoordenadorView from './components/CoordenadorView';
import { IconPackage } from './components/Icons';

function AppContent() {
  const [usuario, setUsuario] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('principal'); // 'principal' ou 'campo' (para coordenador)
  const toast = useToast();
  const { toasts, removeToast } = useToastState();

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getMe()
        .then((dados) => {
          setUsuario(dados);
        })
        .catch(() => {
          api.logout();
          setUsuario(null);
        })
        .finally(() => {
          setLoadingAuth(false);
        });
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const handleLoginSuccess = (userDados) => {
    setUsuario(userDados);
    setAbaAtiva('principal');
  };

  const handleLogout = () => {
    api.logout();
    setUsuario(null);
    setAbaAtiva('principal');
    toast.info('Sessão Encerrada', 'Você saiu do sistema com segurança.');
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg mb-3 animate-pulse">
            <IconPackage className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Conecta Vidas • Carregando
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-stone-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* Sistema de Notificações Toast In-App */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Navegação Acessível */}
      <Navbar
        usuario={usuario}
        onLogout={handleLogout}
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 pb-16">
        {!usuario ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            {usuario.perfil === 'COORDENADOR' ? (
              abaAtiva === 'principal' ? (
                <CoordenadorView usuario={usuario} />
              ) : (
                <EscalaView usuario={usuario} />
              )
            ) : (
              <EscalaView usuario={usuario} />
            )}
          </div>
        )}
      </main>

      {/* Rodapé Acadêmico e Institucional */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-stone-200">
              Projeto de Software • CST em Análise e Desenvolvimento de Sistemas
            </p>
            <p className="text-stone-500 text-[11px] mt-0.5">
              Cruzeiro do Sul Virtual • Associação Comunitária Pão e Vida (ACPV)
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span className="font-mono">FastAPI + React 19 + SQLite</span>
            <span>•</span>
            <span className="font-semibold text-orange-400">ODS 2.1 & LGPD</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
