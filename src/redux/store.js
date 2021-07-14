import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/productSlice';
import shopSlice from './slices/shopSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    shop: shopSlice,
  },
})

export default store