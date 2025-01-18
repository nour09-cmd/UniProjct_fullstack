import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL, TOKEN } from '../../../utils/config';

const initialState: any = {
  loading: true,
  errors: '',
  appos: [],
};
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
export const deletAppointmentVonUser: any = createAsyncThunk(
  '/deletAppointmentVonUser',
  async (data) => {
    try {
      const response = await axios.post(
        `${BASEURL}/ladens/AppointmentVonUser/`,
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
export const getAppos: any = createAsyncThunk(
  '/getAppos',
  async (email: any) => {
    try {
      const token = TOKEN();

      const res = await axios.get(
        `${BASEURL}/ladens/getAppointmentLaden/${email}`,

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
export const getApposUser: any = createAsyncThunk('/getApposUser', async () => {
  try {
    const token = TOKEN();

    const res = await axios.get(
      `${BASEURL}/ladens/getAppointmentUser/`,

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
});

export const createAppos: any = createAsyncThunk(
  '/createAppos',
  async (apoData: any) => {
    try {
      const { barber_email, date, name, time } = apoData;

      const token = await TOKEN();

      const res = await axios.post(
        `${BASEURL}/ladens/appointment/`,
        { ...apoData },
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
        state.loading = false;
        state.errors = '';
      })
      .addCase(createAppos.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getApposUser.fulfilled, (state, action) => {
        state.appos = action.payload;
        state.loading = false;
        state.errors = '';
      });
  },
});

export default AppoSlice.reducer;
