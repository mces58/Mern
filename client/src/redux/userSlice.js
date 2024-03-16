import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import STATUS from 'src/utils/status';

const initialState = {
  user: null,
  status: STATUS.IDLE,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/register', user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          status: STATUS.PENDING,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: STATUS.SUCCESS,
          user: action.payload,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          status: STATUS.ERROR,
          error: action.payload,
        };
      })
      .addCase(registerUser.pending, (state) => {
        return {
          ...state,
          status: STATUS.PENDING,
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: STATUS.SUCCESS,
          user: action.payload,
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          status: STATUS.ERROR,
          error: action.payload,
        };
      });
  },
});

export const userSelector = (state) => {
  return state.user;
};

export default userSlice.reducer;
