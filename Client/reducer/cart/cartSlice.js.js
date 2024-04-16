import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], 
    },
    reducers: {
        addToCart: (state, action) => {
            const { dish, quantity,restaurantName ,restaurantImage} = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.dish.dishName === dish.dishName);

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ dish, quantity,restaurantName,restaurantImage });
            }
        },
        removeFromCart: (state, action) => {
            const dishNameToRemove = action.payload;
            const existingItem = state.items.find(item => item.dish.dishName === dishNameToRemove);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.dish.dishName !== dishNameToRemove);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
