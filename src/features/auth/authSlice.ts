import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { newsSlice } from '../news/newsSlice';

type Error = {
  code: string;
  message: string;
  status: string;
};

type AuthState = {
  email: string;
  token: string;
  loading: boolean;
  error: Error | null;
};

const initialState: AuthState = {
  email: '',
  token: '',
  loading: false,
  error: null,
};

export interface LoginRequest {
  email: string;
  token: string;
}

export const setCredentials = createAsyncThunk(
  'auth/fetchArticles',
  async ({ email, token }: LoginRequest) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=keyword&apiKey=${token}`,
      );
      return await response.json();
    } catch (error) {
      return error;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeCredentials: (state) => {
      state.token = '';
      state.email = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCredentials.fulfilled, (state, action) => {
        if (action.payload.status === 'ok') {
          state.token = action.meta.arg.token;
          state.email = action.meta.arg.email;
          state.error = null;
        } else {
          state.email = '';
          state.token = '';
          state.error = {
            code: action.payload.code,
            message: action.payload.message,
            status: action.payload.status,
          };
        }
        state.loading = false;
      })
      .addCase(setCredentials.rejected, (state, action) => {
        state.loading = false;
        state.email = '';
        state.token = '';
        state.error = {
          code: '500',
          message: 'Internal Error',
          status: 'Failed',
        };
      });
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export const { removeCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authSlice;
