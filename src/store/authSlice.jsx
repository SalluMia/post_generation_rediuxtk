import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem("user") || null),
    token: localStorage.getItem('token'),
    error: null
};

export const loginAuth = createAsyncThunk(
    'auth/login',
    async (payload) => {
        console.log("Payload being sent:", payload);
        const response = await axios.post('http://localhost:5000/api/auth/login', payload);
        console.log("Response received:", response);
        return response.data; // Adjusted to return response.data directly
    }
);

export const signupAuth = createAsyncThunk(
    'auth/signup',
    async (payload) => {
        
        console.log("Payload being sent:", payload);
        const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
        console.log("Response received:", response);
        return response.data; // Adjusted to return response.data directly
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAuth.pending, (state) => {
                state.error = null;
                console.log("Login pending");
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                console.log("Login fulfilled:", action.payload);
                toast.success('Login Successfully')
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.existingUser
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.existingUser));
            })
            .addCase(loginAuth.rejected, (state, action) => {
                console.log("Login rejected:", action.error.message);
                state.isAuthenticated = false;
                state.error = action.error.message || null;
            })
            .addCase(signupAuth.fulfilled,(state,action)=>{
                  toast.success('Account created Successfully')
            })
    }
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;