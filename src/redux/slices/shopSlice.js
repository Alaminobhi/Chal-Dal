import { createSlice } from '@reduxjs/toolkit'


const shopSlice = createSlice({
  name: 'shopItem',
  initialState: {
      shop: [],
},
  reducers: {
    addToShop(state, action) {
      const userKey = JSON.parse(localStorage.getItem('userId'));
      if(!state.shop.length){
        const itemData = (JSON.parse(localStorage?.getItem(userKey)));
        if(itemData){
           itemData.map(data =>state.shop.push(data))
        }
        else{ }
      }
        const shopId = action.payload._id;
        const item = action.payload;
        const sameShop = state.shop.find(sh => sh._id === shopId);
        let count = 0;
        if(sameShop){
          count = parseInt(sameShop.quantity) + 1;
          sameShop.quantity = count;
          const itemIndex = state.shop.map(sh => sh._id).indexOf(shopId);
          state.shop.splice(itemIndex, 1);
          state.shop.push(sameShop);
        }
        if(!sameShop){
          const data = JSON.parse(JSON.stringify(item));
            data.quantity = 1;
          state.shop.push(data);
        }
        localStorage.setItem(userKey, JSON.stringify(state.shop));
    },
    removeShop(state, action) {
      const userKey = JSON.parse(localStorage.getItem('userId'));
      if(!state.shop.length){
        const itemData = (JSON.parse(localStorage?.getItem(userKey)));
        if(itemData){
           itemData.map(data =>state.shop.push(data))
        }
        else{ }
      }
      const shopId = action.payload._id;
      const item = state.shop.find(sh => sh._id === shopId);
          const itemOne = item?.quantity === 1;
          const many = item?.quantity > 1;
          let count = 0;
          if(itemOne){
            const itemIndex = state.shop.map(sh => sh._id).indexOf(shopId);
            state.shop.splice(itemIndex, 1);
          }
          if(many){
              // const data = JSON.parse(JSON.stringify(item));
              count = item?.quantity - 1;
              item.quantity = count;
              const itemIndex = state.shop?.map(sh => sh._id).indexOf(shopId);
              state.shop?.splice(itemIndex, 1);
              state.shop.push(item);
          }else{ }
          localStorage.setItem(userKey, JSON.stringify(state.shop));
    },
    removeOneItem (state, action) {
      const userKey = JSON.parse(localStorage.getItem('userId'));
      if(!state.shop.length){
        const itemData = (JSON.parse(localStorage?.getItem(userKey)));
        if(itemData){
           itemData.map(data =>state.shop.push(data))
        }
        else{ }
      }
      const shopId = action.payload._id;
      const itemIndex = state.shop.map(sh => sh._id).indexOf(shopId);
      state.shop.splice(itemIndex, 1);
      localStorage.setItem(userKey, JSON.stringify(state.shop));
    }
  },
})

export const { addToShop, removeShop, removeOneItem } = shopSlice.actions
export default shopSlice.reducer