import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const MenuItem = ({ itemName, itemImage }) => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
const goToMenu = () =>{
    navigation.navigate('Menu')
}
    return (
        <View style={styles.menuItem}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity  onPress={()=>goToMenu()}>
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

const RestaurantScreen = () => {
    return (

        <ScrollView style={styles.container}>
            {/* Restaurant Image */}
            <Image
                source={{
                    uri:
                        'https://assets.cntraveller.in/photos/651e65983734f323ef3d37fe/16:9/w_7936,h_4464,c_limit/SWING-9.jpg',
                }}
                style={styles.restaurantImage}
            />

            {/* Restaurant Information */}
            <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>Delicious Delights</Text>
                <Text style={styles.restaurantLocation}>123 Main Street, Cityville</Text>
                <Text style={styles.restaurantRating}>Rating: 4.5</Text>
            </View>

            {/* Menu Categories */}
            <View style={styles.menuContainer}>
                <Text style={styles.menuHeader}>Menu</Text>

                {/* Category 1 */}
                <View style={styles.menuCategory}>
                    <Text style={styles.categoryTitle}>Appetizers</Text>
                    {/* Add menu items for this category */}
                    <MenuItem itemName="Item 1" itemImage="https://img.delicious.com.au/EEJ2ozkv/del/2020/10/green-tea-noodles-with-sticky-sweet-chilli-salmon-140868-2.jpg" />
                    <MenuItem itemName="Item 2" itemImage="https://img.delicious.com.au/lVWC7cYc/del/2023/02/p85-sesame-crusted-tuna-with-green-tea-noodle-salad-183897-1.png" />
                    {/* ... */}
                </View>

                {/* Category 2 */}
                <View style={styles.menuCategory}>
                    <Text style={styles.categoryTitle}>Main Course</Text>
                    {/* Add menu items for this category */}
                    <MenuItem itemName="Item 3" itemImage="https://img.delicious.com.au/lVWC7cYc/del/2023/02/p85-sesame-crusted-tuna-with-green-tea-noodle-salad-183897-1.png" />
                    <MenuItem itemName="Item 4" itemImage="https://img.delicious.com.au/EEJ2ozkv/del/2020/10/green-tea-noodles-with-sticky-sweet-chilli-salmon-140868-2.jpg" />
                    {/* ... */}
                </View>

                {/* Add more categories as needed */}
            </View>

            {/* About Section */}
            <View style={styles.aboutContainer}>
                <Text style={styles.aboutHeader}>About Us</Text>
                <Text style={styles.aboutText}>
                    Welcome to Delicious Delights! We take pride in serving delicious and high-quality meals to our customers.
                </Text>
            </View>

            {/* Reviews Section */}
            <View style={styles.reviewsContainer}>
                <Text style={styles.reviewsHeader}>Customer Reviews</Text>
                {/* Add review components here */}
            </View>
        </ScrollView>
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
});

export default RestaurantScreen;
