import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  LadensDaten: [],
  getOneLaden: [],
  priceListe: [],
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
      const res = await axios.post(`${BASEURL}/ladens/getOneladens/`, email);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const createLaden: any = createAsyncThunk(
  '/createLaden',
  async (data: any) => {
    try {
      const res = await axios.post(`${BASEURL}/ladens/getladens/`, data, {
        headers: {
          Authorization: `${TOKEN()}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateLaden: any = createAsyncThunk(
  '/updateLaden',
  async (data: any) => {
    try {
      const res = await axios.post(`${BASEURL}/ladens/getladens/update`, data, {
        headers: {
          Authorization: `${TOKEN()}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getPriceLite: any = createAsyncThunk('/getPriceLite', async () => {
  try {
    const res = await axios.get(`${BASEURL}/ladens/PriceList/`, {
      headers: {
        Authorization: `${TOKEN()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const postPriceLite: any = createAsyncThunk(
  '/postPriceLite',
  async (daten: any) => {
    try {
      const res = await axios.post(`${BASEURL}/ladens/PriceList/`, daten, {
        headers: {
          Authorization: `${TOKEN()}`,
        },
      });
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
        state.LadensDaten = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(getOneLaden.fulfilled, (state, action) => {
        state.getOneLaden = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(createLaden.fulfilled, (state, action) => {
        state.getOneLaden = action.payload;
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(createLaden.rejected, (state, action) => {
        state.getOneLaden = action.payload;
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getPriceLite.fulfilled, (state, action) => {
        state.priceListe = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(postPriceLite.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = '';
      })
      .addCase(updateLaden.fulfilled, (state, action) => {
        state.getOneLaden = action.payload;
        state.loading = false;
        state.errors = '';
      });
  },
});

export default LadenSlice.reducer;
