import { configureStore } from '@reduxjs/toolkit';
import { orbitReducer } from './orbitSlice';


export const store = configureStore({ reducer: {orbit: orbitReducer} });