import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const categoryAsync = createAsyncThunk(
    'category/load',
    async () => {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const data = await res.json();
        return data;
    }
);
// https://lit-reaches-74338.herokuapp.com/items
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryList: []
    },
    reducers: {
        },
      extraReducers: (builder) => {
        builder
          .addCase(categoryAsync.fulfilled, (state, action) => {
            state.categoryList.push(action.payload)
          })
      },
})

// export const { 
//     categoryItem,
// } = categorySlice.actions;
export default categorySlice.reducer