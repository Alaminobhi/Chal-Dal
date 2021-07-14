import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadBookAsync = createAsyncThunk(
    'books/loadData',
    async () => {
        const res = await fetch('https://immense-bastion-56253.herokuapp.com/products')
        const data = await res.json();
        return data;
    }
);
// https://lit-reaches-74338.herokuapp.com/items
const bookSlice = createSlice({
    name: 'books',
    initialState: {
        discoverList: [],
        categoryList: [],
        category: [],
        itemDetail: [],
        searchList: [],
        dataShow: []
    },
    reducers: {
       
      allCategory(state, action){
        let category = [];
        state.categoryList.length = 0;
        state.discoverList[0]?.map(dis => category.push(dis.category))
        let item = [...new Set(category)]   // dublled remove
        state.categoryList.push(item);
       
      },
        categoryItem(state, action){
          state.category.length = 0;
          state.dataShow.length = 0;
          const category=action.payload;
          const data = state.discoverList[0]?.filter(dis => dis.category === category)
          state.category.push(data);
          state.dataShow.push(state.category[0])
        },
        itemOne(state, action){
            state.itemDetail.length = 0;
            const itemId=action.payload;
            const data = state.discoverList[0]?.find(dis => dis._id === itemId)
            state.itemDetail?.push(data);
          },
          searchItem(state, action){
            state.searchList.length = 0;
            state.dataShow.length = 0;
            const te = (action.payload).toLowerCase();
            const text = ' ' + te;
           state.discoverList[0]?.map(el => {
             const tata = el.name.toLowerCase();
             let t = '/';
             for (let i = ''; i < text?.length; i++) {
              
              if( text[i] === ' '){
                 t += '|';
              } 
              if(text[i] === undefined){
               
              }
              else{
                t += text[i] 
              }
             }
             t += '/gi'
             console.log(t);
             const arr = tata?.match(t);
            if(arr === null){
              
            } else{ 
              state.searchList.push(el);
            }
            });
            state.dataShow.push(state.searchList)
          }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadBookAsync.fulfilled, (state, action) => {
            state.dataShow.length = 0;
            state.discoverList.push(action.payload);
            state.dataShow.push(state.discoverList[0])
          })
      },
})

export const { 
    categoryItem,
    itemOne,
    allCategory,
    searchItem
} = bookSlice.actions;
export default bookSlice.reducer