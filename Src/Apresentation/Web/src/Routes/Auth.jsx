// src/utils/auth.js
export const login = () => {
  // Simula um login bem-sucedido
  localStorage.setItem('isLoggedIn', 'true');
};

export const logout = () => {
  // Simula o logout
  localStorage.removeItem('isLoggedIn');
};

export const isAuthenticated = () => {
  // Verifica se o usuário está autenticado
  return localStorage.getItem('isLoggedIn') === 'true';
};
