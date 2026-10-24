/**
 * Cliente de API oficial da ONG Conecta Vidas.
 * Faz chamadas RESTful ao backend FastAPI com gerenciamento de token JWT e tratamento defensivo de erros.
 */

const API_BASE = '/api';

/**
 * Retorna os headers padrão para requisições, incluindo o Bearer Token caso autenticado.
 */
function getHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('conectavidas_token');
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Trata resposta HTTP garantindo que erros silenciosos nunca ocorram.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Erro HTTP ${response.status}: ${response.statusText}`;
    try {
      const data = await response.json();
      if (data && data.detail) {
        errorMessage = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
      }
    } catch {
      // Falha ao ler corpo JSON, mantém mensagem HTTP padrão
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export const api = {
  /**
   * Efetua login com e-mail e senha.
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });
    const data = await handleResponse(response);
    if (data.access_token) {
      localStorage.setItem('conectavidas_token', data.access_token);
      localStorage.setItem('conectavidas_user', JSON.stringify(data.usuario));
    }
    return data;
  },

  /**
   * Retorna os dados do usuário autenticado no backend.
   */
  async getMe() {
    const response = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Remove o token local e encerra a sessão.
   */
  logout() {
    localStorage.removeItem('conectavidas_token');
    localStorage.removeItem('conectavidas_user');
  },

  /**
   * Retorna o usuário salvo em localStorage (sem chamada de rede).
   */
  getStoredUser() {
    try {
      const raw = localStorage.getItem('conectavidas_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Retorna o token JWT salvo em localStorage.
   */
  getToken() {
    return localStorage.getItem('conectavidas_token');
  },

  /**
   * Consulta os itens de estoque físico disponíveis (RF01).
   */
  async getEstoque() {
    const response = await fetch(`${API_BASE}/estoque`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Lista todos os voluntários cadastrados (Exclusivo Coordenação).
   */
  async getVoluntarios() {
    const response = await fetch(`${API_BASE}/voluntarios`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Lista todas as famílias assistidas (Exclusivo Coordenação).
   */
  async getFamilias() {
    const response = await fetch(`${API_BASE}/familias`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Lista as entregas. Se voluntário, retorna apenas as dele (RF02). Se coordenação, retorna todas.
   */
  async getEntregas() {
    const response = await fetch(`${API_BASE}/entregas`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Cria e despacha uma nova entrega (RF01 - débito atômico de estoque).
   * @param {Object} entregaData
   */
  async criarEntrega(entregaData) {
    const response = await fetch(`${API_BASE}/entregas`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(entregaData),
    });
    return handleResponse(response);
  },

  /**
   * Conclui uma entrega em campo com confirmação de recebimento (RF03 - baixa idempotente).
   * @param {number} entregaId
   */
  async concluirEntrega(entregaId) {
    const response = await fetch(`${API_BASE}/entregas/${entregaId}/concluir`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Checagem de integridade e conectividade da API.
   */
  async checkHealth() {
    const response = await fetch(`${API_BASE}/health`);
    return handleResponse(response);
  },
};
