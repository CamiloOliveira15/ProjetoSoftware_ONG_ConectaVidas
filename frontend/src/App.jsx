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
  const [abaAtiva, setAbaAtiva] = useState('principal'); // 'principal' ou 'campo'
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
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-2xl bg-orange-700 text-white flex items-center justify-center shadow-sm mb-3 animate-pulse">
            <IconPackage className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold tracking-wider text-slate-500">
            Conecta Vidas • Carregando
          </p>
        </div>
      </div>
    );
  }

  // Se não estiver logado, exibe tela cheia dividida
  if (!usuario) {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-orange-600 selection:text-white">
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Shell Comunitário Fluido Widescreen em Branco Gelo (#f8fafc)
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-orange-600 selection:text-white">
      
      {/* Sistema de Notificações Toast In-App */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Top Navbar Fluida */}
      <Navbar
        usuario={usuario}
        onLogout={handleLogout}
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

      {/* Área Principal de Trabalho Fluida (Aproveitamento Total das Laterais) */}
      <main className="flex-1 w-full px-6 sm:px-10 lg:px-12 py-6">
        {usuario.perfil === 'COORDENADOR' ? (
          abaAtiva === 'principal' ? (
            <CoordenadorView usuario={usuario} />
          ) : (
            <EscalaView usuario={usuario} />
          )
        ) : (
          <EscalaView usuario={usuario} />
        )}
      </main>

      {/* Rodapé Acadêmico Discreto */}
      <footer className="bg-slate-900 text-slate-300 text-xs py-6 border-t border-slate-800 mt-12 w-full">
        <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-100">
              Projeto de Software • CST em Análise e Desenvolvimento de Sistemas
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              Cruzeiro do Sul Virtual • Associação Comunitária Pão e Vida (ACPV)
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-mono">FastAPI + React 19 + SQLite WAL</span>
            <span>•</span>
            <span className="font-semibold text-orange-400">ODS 2.1 & LGPD Conforme</span>
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
