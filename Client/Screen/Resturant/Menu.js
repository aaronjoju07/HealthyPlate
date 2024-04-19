import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = ({route}) => {
  const item = route.params;
  console.log(item.item.dish.ingredients);
  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Image */}
      <Image
        source={{
          uri: item.item.imageUrl 
        }}
        style={styles.menuImage}
      />

      {/* Menu Information */}
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.item.dishName}</Text>
        <Text style={styles.menuDescription}>
          {item.item.dish.aboutDish}
        </Text>
        <Text style={styles.menuDescription}>
          Meal Type : {item.item.dish.mealType}
        </Text>
        <View style={styles.nutritionInfo}>
          {renderNutritionItem('Calories', item.item.dish.calories.toString(), 'https://www.shutterstock.com/image-vector/kcal-fire-icon-kilocalories-sign-600nw-2387906665.jpg')}
          {renderNutritionItem('Proteins', item.item.dish.proteinContent.toString(), 'https://img.freepik.com/premium-vector/protein-icon-vector-illustration-symbol-design_609277-7180.jpg')}
          {renderNutritionItem('Sugar',  item.item.dish.sugarContent.toString(), 'https://static.vecteezy.com/system/resources/previews/000/630/403/original/sugar-icon-symbol-sign-vector.jpg')}
        </View>
        <Text style={styles.ingredientsHeader}>Ingredients:</Text>
      {item.item.dish.ingredients.map((ingredient, index) => (
  renderIngredientItem(ingredient.ingredientName, 'https://www.foodingredientfacts.org/wp-content/uploads/2017/11/AdobeStock_49033437-dont-fear-ingredients-in-your-food-1024x783.jpeg',keyof=ingredient._id) // Replace this URL with the actual URL for each ingredient
))}
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

const renderIngredientItem = (name, imageUrl,keyof) => {
  return (
    <View style={styles.ingredientItem} key={keyof}>
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
    borderRadius:10
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
