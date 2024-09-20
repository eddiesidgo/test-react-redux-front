import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL base
const API_URL = 'http://localhost:8000/api/users';

// Obtener el token desde localStorage
const token = localStorage.getItem('token');

// Configurar las cabeceras para incluir el token si está presente
const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

// Thunks para las acciones asíncronas
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response.json();
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return response.json();
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return response.json();
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Token de autenticación
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return id;
  });

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        state.users[index] = updatedUser;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
