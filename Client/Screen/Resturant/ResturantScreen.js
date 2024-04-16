import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import ReviewCard from '../../Components/ReviewCard';
import CartIcon from '../../Components/Cart/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../../reducer/cart/cartSlice.js';
import ReviewInput from '../../Components/Review/ReviewInput.js';
import axios from 'axios'

const MenuItem = ({ itemName, itemImage, dish ,restaurantName,restaurantImage}) => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(addToCart({ dish, quantity: 1, restaurantName: restaurantName, restaurantImage: restaurantImage }));
    };    
    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
        const existingItem = cartItems.find(item => item.dish.dishName === dish.dishName);

        if (existingItem) {
            dispatch(removeFromCart(dish.dishName));
        }
    };
    const goToMenu = () => {
        navigation.navigate('Menu', { item: dish });
    }
    return (
        <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => goToMenu()} style={styles.menuItemContainer}>
                <Image source={{ uri: itemImage }} style={styles.menuItemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{itemName}</Text>
                    <Text style={styles.itemAmount}>₹{dish.price}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decrementQuantity}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={incrementQuantity}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const RestaurantScreen = ({ route }) => {
    const { restaurant } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState([]);
    const restaurantId = restaurant._id;
    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.URL}/getRestaurantReviews/${restaurantId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }

            const data = await response.json();
            setReviews(data.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            dispatch(clearCart());
            navigation.dispatch(e.data.action);
        });
    }, [])
    const handleReviewSubmission = async (newReview) => {
        try {
            // console.log(newReview);
            const response = await axios.post(`http://localhost:5001/restaurants/${restaurantId}/reviews`, newReview, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            fetchReviews()
            // console.log('Response from server:', data);
            Alert.alert('Review Submitted', 'Thank you for your feedback!');
            // fetchReviews()
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View style={styles.container}>
            <CartIcon />
            <ScrollView >
                {/* Restaurant Image */}
                <Image
                    source={{
                        uri:
                            restaurant.imageAddress,
                    }}
                    style={styles.restaurantImage}
                />

                {/* Restaurant Information */}
                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
                    <Text style={styles.restaurantLocation}>{restaurant.address}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.restaurantRating}>Rating: {restaurant.overallRating}</Text>
                    </View>
                </View>
                {/* Restaurant Menu */}
                <View style={styles.menuContainer}>
                    <Text style={styles.menuHeader}>Menu</Text>

                    {restaurant.menu.map((category) => (
                        <View key={category.menuCategory} style={styles.menuCategory}>
                            <Text style={styles.categoryTitle}>{category.menuCategory}</Text>
                            {/* Display menu items for this category */}
                            {restaurant.menu.map((dish) => (
                                dish.menuCategory === category.menuCategory ? (
                                    <MenuItem
                                        key={dish.dishName}
                                        itemName={dish.dishName}
                                        itemImage={dish.imageUrl}
                                        dish={dish}
                                        restaurantName={restaurant.restaurantName}
                                        restaurantImage={restaurant.imageAddress}
                                    />
                                ) : null
                            ))}
                        </View>
                    ))}
                </View>
                {/* About Section */}
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutHeader}>About Us</Text>
                    <Text style={styles.aboutText}>
                        {restaurant.about}
                    </Text>
                </View>
                {/* Reviews Section */}
                {/* User Review Input */}
                <ReviewInput onSubmit={handleReviewSubmission} />
                {/* Restaurant Reviews */}
                <View style={styles.reviewsContainer}>
                    <Text style={styles.reviewsHeader}>Customer Reviews</Text>
                    {/* Add review components here */}
                    {reviews.map((rest, index) => (
                        <ReviewCard key={index} comment={rest.comment} rating={rest.rating} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    restaurantImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    restaurantInfo: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    restaurantLocation: {
        fontSize: 16,
        color: '#777',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantRating: {
        fontSize: 16,
        color: '#f8d12c',
        marginRight: 5,
    },
    menuHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    menuCategory: {
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    aboutContainer: {
        padding: 16,
    },
    aboutHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 16,
    },
    reviewsContainer: {
        padding: 16,
    },
    reviewsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    reviewInputContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        elevation: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 8,
    },
    submitReviewButton: {
        backgroundColor: 'rgba(0, 128, 0, 0.8)',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        // flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    menuContainer: {
        padding: 16,
    }, itemAmount: {
        color: '#888', // Adjust the color according to your design
    },

});

export default RestaurantScreen;
