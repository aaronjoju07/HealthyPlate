import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array to store cart items {dish, quantity}
    },
    reducers: {
        addToCart: (state, action) => {
            const { dish, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.dish.dishName === dish.dishName);

            if (existingItemIndex !== -1) {
                // Update quantity if the item already exists in the cart
                state.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to the cart
                state.items.push({ dish, quantity });
            }
        },
        removeFromCart: (state, action) => {
            const dishNameToRemove = action.payload;
            const existingItem = state.items.find(item => item.dish.dishName === dishNameToRemove);

            if (existingItem) {
                // Decrement quantity if greater than 1, else remove the item
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
