import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  closeDays: [],
};
export const getCloseDaysData: any = createAsyncThunk(
  '/getCloseDays',
  async (email: any) => {
    try {
      const token = TOKEN();
      const res = await axios.post(
        `${BASEURL}/ladens/closedayss/`,
        { email },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const createCloseDay: any = createAsyncThunk(
  '/createCloseDay',
  async (closeday: { date: string; barberEmail: string }) => {
    try {
      const token = await TOKEN();

      const res = await axios.post(`${BASEURL}/ladens/closedays/`, closeday, {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteCloseDay: any = createAsyncThunk(
  '/deleteCloseDay',
  async (data: { closeDayId: string }) => {
    try {
      const response = await axios.post(`${BASEURL}/ladens/closedaysD/`, data, {
        headers: {
          Authorization: `${TOKEN()}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Error deleting close day');
    }
  }
);
const CloseDaysSlice = createSlice({
  name: 'closeDays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCloseDaysData.fulfilled, (state, action) => {
        state.closeDays = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(createCloseDay.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteCloseDay.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = '';
      });
  },
});
export default CloseDaysSlice.reducer;
