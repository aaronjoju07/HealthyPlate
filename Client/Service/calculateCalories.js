export default function calculateCalories(weight, height, age, gender, activityFactor, goal) {
    let bmr;

    if (gender.toLowerCase() === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender.toLowerCase() === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        console.error('Invalid gender. Please provide "male" or "female".');
        return;
    }

    let totalCalories = bmr * activityFactor;

    if (goal.toLowerCase() === 'weight gain') {
        totalCalories += 250; // Increase by 500 calories for weight gain for a week 1KG
    } else if (goal.toLowerCase() === 'weight loss') {
        totalCalories -= 250; // Decrease by 500 calories for weight loss
    } else if (goal.toLowerCase() !== 'maintain') {
        console.error('Invalid goal. Please provide "gain", "loss", or "maintain".');
        return;
    }
    
    return parseFloat(totalCalories.toFixed(2));
}