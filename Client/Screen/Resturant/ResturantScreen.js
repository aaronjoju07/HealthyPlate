import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import ReviewCard from '../../Components/ReviewCard';
import CartIcon from '../../Components/Cart/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../../reducer/cart/cartSlice.js';
import ReviewInput from '../../Components/Review/ReviewInput.js';

const MenuItem = ({ itemName, itemImage, dish }) => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(addToCart({ dish, quantity: 1 }));
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
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => goToMenu()}>
                    <Image source={{ uri: itemImage }} style={styles.menuItemImage} />
                    <Text>{itemName}</Text>
                </TouchableOpacity>
            </View>
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
    const [userReview, setUserReview] = useState({
        comment: '',
        rating: 0,
    });
    const handleReviewSubmit = () => {
        // Validate review inputs (you can add more validation logic)
        if (!userReview.comment || userReview.rating === 0) {
            Alert.alert('Incomplete Review', 'Please provide both comment and rating.');
            return;
        }

        // Add the user's review to the restaurant's reviews
        const updatedReviews = [...restaurant.reviews, userReview];

        // Perform any other necessary logic (e.g., send data to server, update state, etc.)

        // Clear the review input fields
        setUserReview({
            comment: '',
            rating: 0,
        });

        Alert.alert('Review Submitted', 'Thank you for your feedback!');
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Log the action
            dispatch(clearCart());
            console.log('User navigated back from RestaurantScreen');

            // Continue with the navigation
            navigation.dispatch(e.data.action);
        });
    }, [])

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
                    <Text style={styles.restaurantRating}>Rating:{restaurant.overallRating}</Text>
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
                <ReviewInput />
                {/* Restaurant Reviews */}
                <View style={styles.reviewsContainer}>
                    <Text style={styles.reviewsHeader}>Customer Reviews</Text>
                    {/* Add review components here */}
                    {restaurant.reviews.map((rest, index) => (
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
        // marginTop:15
    },
    restaurantImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    restaurantInfo: {
        padding: 16,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    restaurantLocation: {
        fontSize: 16,
        marginBottom: 4,
    },
    restaurantRating: {
        fontSize: 16,
        color: 'green',
    },
    menuContainer: {
        padding: 16,
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
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    menuItemImage: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 25,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    quantityButton: {
        fontSize: 20,
        marginHorizontal: 8,
    },
    quantity: {
        fontSize: 16,
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
});

export default RestaurantScreen;
