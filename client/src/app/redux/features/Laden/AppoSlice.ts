import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  appos: [],
};
//TODO CLANDER const createtApo: any = createAsyncThunk('/deletApo', async (id) => {});
export const deletAppointmentVonBarber: any = createAsyncThunk(
  '/deletAppointmentVonBarber',
  async (data) => {
    try {
      const response = await axios.post(
        `${BASEURL}/ladens/AppointmentVonBarber/`,
        data,
        {
          headers: {
            Authorization: `${TOKEN()}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
// export const deletAppointmentVonUser: any = createAsyncThunk(
//   '/deletAppointmentVonUser',
//   async (id) => {}
// );
export const getAppos: any = createAsyncThunk(
  '/getAppos',
  async (email: any) => {
    try {
      const token = TOKEN();

      const res = await axios.post(
        `${BASEURL}/ladens/getAppointmentLaden/`,
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

const AppoSlice = createSlice({
  name: 'appo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppos.fulfilled, (state, action) => {
        state.appos = action.payload;
        state.loading = false;
        state.errors = '';
      })
      .addCase(deletAppointmentVonBarber.fulfilled, (state, action) => {
        //TODO change the apo state.appos = action.payload;
        state.loading = false;
        state.errors = '';
      });
  },
});

export default AppoSlice.reducer;
