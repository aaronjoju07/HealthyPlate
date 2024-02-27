from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

data_path = 'diet_recommendation_system.csv'
df = pd.read_csv(data_path)


daily_requirements = {
    'Calories': 2000,
    'Fats': 70,  # in grams
    'Proteins': 50,  # in grams
    'Iron': 18,  # mg
    'Calcium': 1000,  # mg
    'Sodium': 2300,  # mg
    'Potassium': 3500,  # mg
    'Carbohydrates': 300,  # g
    'Fibre': 30,  # g
    'VitaminD': 20,  # µg
    'Sugars': 50,  # g
}

# Functions for nutritional analysis and recommendations
def log_user_daily_intake(user_food_items):
    user_intake = df[df['Food_items'].isin(user_food_items)].sum().to_dict()
    return user_intake

def recommend_foods(deficiencies):
    recommendations = {}
    for nutrient, deficit in deficiencies.items():
        suitable_foods = df[df[nutrient] > 0][['Food_items', nutrient]].sort_values(by=nutrient, ascending=False)
        recommendations[nutrient] = suitable_foods.head(3).to_dict('records')  # Top 3 foods for simplicity
    return recommendations

@app.route('/recommend', methods=['POST'])
def recommend():
    try:

        user_daily_log = request.json.get('user_daily_log', [])


        user_intake = log_user_daily_intake(user_daily_log)


        deficiencies = {nutrient: daily_requirements[nutrient] - user_intake.get(nutrient, 0) for nutrient in daily_requirements}


        food_recommendations = recommend_foods(deficiencies)

        return jsonify({
            'user_intake': user_intake,
            'deficiencies': deficiencies,
            'food_recommendations': food_recommendations
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port="8001")
