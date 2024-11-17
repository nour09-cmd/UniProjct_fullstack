import axios from 'axios'; // for API Req  [POST=create, GET, PUT, DELETE]
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  LadensDaten: [],
  getOneLaden: [],
};

export const getAllData: any = createAsyncThunk('/getAllData', async () => {
  try {
    const res = await axios.get(`${BASEURL}/ladens/getladens/`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const getOneLaden: any = createAsyncThunk(
  '/getOneLaden',
  async (email: any) => {
    try {
      console.log(email);
      const res = await axios.post(`${BASEURL}/ladens/getOneladens/`, email);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const LadenSlice = createSlice({
  name: 'laden',
  initialState,
  reducers: {
    sucheNacheOrt() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.LadensDaten = action.payload;
        state.errors = '';
      })
      .addCase(getOneLaden.fulfilled, (state, action) => {
        state.loading = false;
        state.getOneLaden = action.payload;
        state.errors = '';
      });
  },
});

export default LadenSlice.reducer;
