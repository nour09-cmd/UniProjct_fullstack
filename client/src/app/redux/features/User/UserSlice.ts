import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  singUpError: [],
  userData: [],
  userProfile: [],
  loading: true,
  errors: '',
};

export const logIn: any = createAsyncThunk(
  '/logIn',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASEURL}/users/singin/`, userData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      return res.data;
    } catch (e: any) {
      console.log('message:', e);
      return rejectWithValue(e.response?.data || 'Failed to log in');
    }
  }
);

export const singUp: any = createAsyncThunk(
  '/singUp',
  async (userData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASEURL}/users/singup/`, userData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Sign-up failed');
    }
  }
);

export const getUserData: any = createAsyncThunk(
  '/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const token = TOKEN();
      if (!token) {
        return;
      }
      const res: any = await axios.get(`${BASEURL}/users/getUserData/`, {
        headers: {
          authorization: token,
        },
      });
      if (res.data.message == 'Invalid token') {
        localStorage.removeItem('token');
        return rejectWithValue('Invalid token');
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      if (error.message == 'Request failed with status code 400') {
        localStorage.removeItem('token');
      }
      return rejectWithValue(
        error.response?.data || 'Failed to fetch user data'
      );
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sayHello() {
      console.log('hello');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(singUp.fulfilled, (state, action) => {
        console.log('SingUp Rejected Action:', action);
        state.singUpError = action.payload || [];
        state.loading = false;
        state.errors = action.payload?.message || 'Sign-up failed';
      })
      .addCase(singUp.rejected, (state, action) => {
        console.log('SingUp Rejected Action:', action);
        state.singUpError = action.payload.errors || [];
        state.loading = false;
        state.errors = action.payload?.message || 'Sign-up failed';
      });
  },
});

export default UserSlice.reducer;
