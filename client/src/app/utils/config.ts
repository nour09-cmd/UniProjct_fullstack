export const BASEURL = 'http://localhost:4545/api'; // bei deploay env ist wichtig oder diese url andern
// export const TOKEN = localStorage.getItem('token') || '';
export const TOKEN = () => {
  return localStorage.getItem('token') || '';
};
