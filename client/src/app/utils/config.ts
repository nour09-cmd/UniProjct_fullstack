import axios from 'axios';

export const BASEURL = 'http://localhost:4545/api'; 
export const TOKEN = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return localStorage.getItem('token') || '';
  }
  return '';
};
export const logOut = () => {
  localStorage.removeItem('token');
};

export const rolleIsBarber = async (): Promise<boolean> => {
  try {
    const token = TOKEN();
    if (!token) {
      return false;
    }
    const res = await axios.get(`${BASEURL}/users/rollerChecker/`, {
      headers: { authorization: token },
    });

    return res.data.barber === true;
  } catch (error) {
    console.error('Rollenprüfung fehlgeschlagen:', error);
    return false;
  }
};
export const rolleIsUser = async (): Promise<boolean> => {
  try {
    const token = TOKEN();
    if (!token) {
      return false;
    }
    const res = await axios.get(`${BASEURL}/users/rollerChecker/`, {
      headers: { authorization: token },
    });

    return res.data.User === true;
  } catch (error) {
    console.error('Rollenprüfung fehlgeschlagen:', error);
    return false;
  }
};
