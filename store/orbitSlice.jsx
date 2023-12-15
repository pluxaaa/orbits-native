import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orbits: [],
    orbit: {},
};

export const orbitSlice = createSlice({
    name: 'orbit',
    initialState,
    reducers: {
        setOrbits: (state, { payload }) => {
            console.log('setOrbits');
            state.orbits = payload;
        },
        setOrbit: (state, { payload }) => {
            console.log('setOrbit');
            state.orbit = payload;
        },
        resetOrbit: (state) => {
            console.log('resetOrbit');
            state.orbit = {};
        },
    },
});

export const orbitReducer = orbitSlice.reducer;

export const { setOrbits, setOrbit, resetOrbit } = orbitSlice.actions;