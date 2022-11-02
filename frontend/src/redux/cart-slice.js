import { createSlice } from "@reduxjs/toolkit"

const loadState = JSON.parse(localStorage.getItem('reduxState'));

const initialState = loadState || {
        items           : [],
        totalQuantity   : 0,
        totalPrice      : 0,
}

export const cartSlice = createSlice({
    name:'cart',
    initialState: initialState,
    reducers: {
        loadCart: (state, action) => {
            const loadedCart = action.payload;

            state.items         = loadedCart.items;
            state.totalQuantity = loadedCart.totalQuantity;
            state.totalPrice    = loadedCart.totalPrice;
        },
        resetCart: (state, action) => {
            state.items         = [];
            state.totalQuantity = 0;
            state.totalPrice    = 0;
        },
        addItem: (state, action) => {
            const newItem      = action.payload;
            const existingItem = state.items.find((item) => (item.id === newItem.id));
            
            if(existingItem)
                existingItem.quantity += newItem.quantity;
            else
                state.items.push(newItem);

            state.totalQuantity += newItem.quantity;
            state.totalPrice    += newItem.quantity * newItem.price;
        },

        removeItem: (state, action) => {
            const index         = action.payload;
            const removedItem   = state.items[index];

            state.totalPrice   -= removedItem.price * removedItem.quantity;
            state.totalQuantity-= removedItem.quantity;
            state.items         = state.items.filter(item => item.id !== removedItem.id);
        },

        increaseQuantity: (state, action) => {
            //in the future value >= 1
            const index = action.payload;
            const item  = state.items[index];

            state.totalPrice += item.price;
            state.totalQuantity++;
            item.quantity++;
        },

        decreaseQuantity: (state, action) => {
            const index      = action.payload;
            const updateItem = state.items[index];

            state.totalPrice -= updateItem.price;
            updateItem.quantity--;
            state.totalQuantity--;
            if(updateItem.quantity === 0)
               state.items = state.items.filter(item => item.id !== updateItem.id);
        },

        clearCart: (state) => {
            state.items         = [];
            state.totalPrice    = 0;
            state.totalQuantity = 0;
        }
    }
});
  
  // Action creators are generated for each case reducer function
  export const { 
    loadCart,
    resetCart,
    addItem, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart } = cartSlice.actions
  
  export default cartSlice.reducer