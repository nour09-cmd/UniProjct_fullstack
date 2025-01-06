import axios from 'axios';

export const BASEURL = 'http://localhost:4546/api'; // bei deploay env ist wichtig oder diese url andern
// export const TOKEN = localStorage.getItem('token') || '';
export const TOKEN = () => {
  return localStorage.getItem('token') || '';
};

export const logOut = () => {
  localStorage.removeItem('token');
};

export const rolleIsBarber = async (): Promise<boolean> => {
  try {
    const token = TOKEN();
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
    const res = await axios.get(`${BASEURL}/users/rollerChecker/`, {
      headers: { authorization: token },
    });

    return res.data.User === true;
  } catch (error) {
    console.error('Rollenprüfung fehlgeschlagen:', error);
    return false;
  }
};
