import { createSlice } from "@reduxjs/toolkit"


export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        notification: null,
        menu:{
            cartIsOpen        : false,
            sideMenuIsOpen    : false,
            accountMenuIsOpen : false,
        }
    },
    reducers: {
        toggleCart: (state) => {
            state.menu.cartIsOpen        = !state.menu.cartIsOpen;
            state.menu.sideMenuIsOpen    = false;
            state.menu.accountMenuIsOpen = false;
        },

        toggleSideMenu: (state) => {
            state.menu.cartIsOpen        = false;
            state.menu.sideMenuIsOpen    = !state.menu.sideMenuIsOpen;
            state.menu.accountMenuIsOpen = false;
        },

        toggleAccMenu: (state) => {
            state.menu.cartIsOpen        = false;
            state.menu.sideMenuIsOpen    = false;
            state.menu.accountMenuIsOpen = !state.menu.accountMenuIsOpen;
        }
    }
});

export const { toggleCart, toggleSideMenu, toggleAccMenu } = uiSlice.actions;
  
export default uiSlice.reducer;