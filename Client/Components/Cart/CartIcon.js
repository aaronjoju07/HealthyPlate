import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const CartIcon = () => {
    const cartItems = useSelector((state) => state.cart.items);
    // Calculate the sum of the product of price and quantity
    const totalSum = cartItems.reduce((sum, cart) => {
        // Assuming cart.dish.price and cart.quantity are numbers
        const productTotal = cart.dish.price * cart.quantity;
        return sum + productTotal
    }, 0);
    // Round the total sum to 2 decimal places
    const cartTotal = totalSum.toFixed(2);
    const navigation = useNavigation();
    if (cartItems.length == 0) {
        return null
    } else {
        return (
            <View style={{ position: 'absolute', zIndex: 50, width: '100%', bottom: '7%', height: '5.5%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 199, 0, 0.91)',
                        padding: 5,
                        borderRadius: 999,
                        marginHorizontal: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                    }}
                >
                    <View style={{ borderRadius: 50, padding: 1, paddingVertical: 2, backgroundColor: 'white' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, borderRadius: 50, paddingHorizontal: 10 }}>
                            {cartItems.length}
                        </Text>
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>View Cart</Text>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>₹
                        {cartTotal}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };
}


export default CartIcon;
