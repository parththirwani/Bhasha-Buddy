import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/counterSlice'
import store from '@/store'
export const makeStore = () => {
  return configureStore({
    reducer: {
        counter:counterReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppDispatch = typeof store.dispatch