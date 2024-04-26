// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
  count2: number; 
}

const initialState: CounterState = {
  count: 0,
  count2: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    
    incrementCount2: (state) => {
      state.count2 += 1;
    },
  },
});

export const { increment, decrement, incrementByAmount ,incrementCount2} = counterSlice.actions;
export default counterSlice.reducer;