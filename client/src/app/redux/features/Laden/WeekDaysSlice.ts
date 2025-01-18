import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  weekDays: [],
};

export const getWeeksDaysData: any = createAsyncThunk(
  '/getWeeksDaysData',
  async (email: any) => {
    try {
      const token = TOKEN();

      const res = await axios.post(
        `${BASEURL}/ladens/weekdays/`,
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

export const updateWeeksDaysData: any = createAsyncThunk(
  '/updateWeeksDaysData',
  async (dataList: any) => {
    try {
      const token = TOKEN();
      const res = await axios.put(
        `${BASEURL}/ladens/weekdays/`,
        { weekDays: [...dataList] },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
    }
  }
);

const WeeksDaysSlice = createSlice({
  name: 'weeksDays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeeksDaysData.fulfilled, (state, action) => {
        state.weekDays = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(updateWeeksDaysData.fulfilled, (state, action) => {
        state.weekDays = action.payload;
        state.loading = false;
        state.errors = '';
      });
  },
});

export default WeeksDaysSlice.reducer;
