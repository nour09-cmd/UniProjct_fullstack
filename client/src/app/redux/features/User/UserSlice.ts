import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../../../utils/config';

const initialState: any = {
  userData: [],
  userProfile: [],
  loading: true,
  errors: '',
};

// , {
//       headers: {
//         authorization: TOKEN,
//       },
//     }
export const logIn: any = createAsyncThunk('/logIn', async (userDate) => {
  try {
    const res = axios.post(`${BASEURL}/users/singin/`, userDate);
    const token = (await res).data.token;
    localStorage.setItem('token', token);
  } catch (e) {
    console.log('massega:', e);
  }
});

export const getUserData: any = createAsyncThunk('/getUserData', async () => {
  try {
    const token = localStorage.getItem('token');
    const data: any = await axios.get(`${BASEURL}/users/getUserData/`, {
      headers: {
        authorization: token,
      },
    });
    if (data.data.message == 'Invalid token') {
      localStorage.removeItem('token');
      return [];
    }
    // console.log(data.response.data.message);
    return data.data;
  } catch (error) {
    localStorage.removeItem('token');
    console.log(error);
  }
});
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sayHallo() {
      console.log('hello');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = '';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.errors = '';
      });
  },
});

export default UserSlice.reducer;
