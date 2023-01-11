import { createSlice } from "@reduxjs/toolkit"

const loadState = localStorage.getItem('reduxState');
export const cartInitialState = {
    items           : [],
    totalQuantity   : 0,
    totalPrice      : 0,
};

const initialState = loadState?.cart ? loadState.cart : cartInitialState;

const cartSlice = createSlice({
    name:'cart',
    initialState: initialState,
    reducers: {
        loadCart: (state, action) => {
            const loadedCart = action.payload;

            let totalQuantity = 0;
            let totalPrice = 0;
            for(const item of loadedCart){
                totalQuantity += item.quantity;
                totalPrice += item.price * item.quantity;
            };

            console.log(totalPrice + ' ' + totalQuantity);

            state.items         = loadedCart;
            state.totalQuantity = totalQuantity;
            state.totalPrice    = totalPrice.toFixed(2);
        },
        resetCart: (state, action) => {
            state = cartInitialState;
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
    clearCart } = cartSlice.actions;
  
  export default cartSlice.reducer;