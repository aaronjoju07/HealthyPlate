import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Image */}
      <Image
        source={{
          uri: 'https://img.delicious.com.au/EEJ2ozkv/del/2020/10/green-tea-noodles-with-sticky-sweet-chilli-salmon-140868-2.jpg', // Replace with the actual image source
        }}
        style={styles.menuImage}
      />

      {/* Menu Information */}
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>Delicious Dish</Text>
        <Text style={styles.menuDescription}>
          A mouth-watering description of the delicious dish goes here.
        </Text>
        <View style={styles.nutritionInfo}>
          {renderNutritionItem('Calories', '350', 'https://www.shutterstock.com/image-vector/kcal-fire-icon-kilocalories-sign-600nw-2387906665.jpg')}
          {renderNutritionItem('Proteins', '20g', 'https://img.freepik.com/premium-vector/protein-icon-vector-illustration-symbol-design_609277-7180.jpg')}
          {renderNutritionItem('Sugar', '5g', 'https://static.vecteezy.com/system/resources/previews/000/630/403/original/sugar-icon-symbol-sign-vector.jpg')}
        </View>
        <Text style={styles.ingredientsHeader}>Ingredients:</Text>
        {renderIngredientItem('Ingredient 1', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322745/salt-shaker.jpg')}
        {renderIngredientItem('Ingredient 2', 'https://nuttyyogi.com/cdn/shop/products/MustardSeeds.png?v=1680767117')}
        {renderIngredientItem('Ingredient 3', 'https://www.jindeal.com/wp-content/uploads/2020/01/vedini-coconut-oil-extra-virgin.jpg')}
        {/* Add the actual list of ingredients */}
      </View>
    </SafeAreaView>
  );
};

const renderNutritionItem = (label, value, imageUrl) => {
  return (
    <View style={styles.nutritionItem}>
      <Image source={{ uri: imageUrl }} style={styles.nutritionItemImage} />
      <Text>{`${label}: ${value}`}</Text>
    </View>
  );
};

const renderIngredientItem = (name, imageUrl) => {
  return (
    <View style={styles.ingredientItem}>
      <Image source={{ uri: imageUrl }} style={styles.ingredientItemImage} />
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  menuImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  menuInfo: {
    marginBottom: 16,
  },
  menuName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionItemImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  ingredientsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientItemImage: {
    width: 40,
    height:40,
    marginRight: 8,
  },
});

export default Menu;
