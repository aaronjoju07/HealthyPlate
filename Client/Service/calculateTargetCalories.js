export default function calculateTargetCalories(goal, currentWeight, targetWeight) {
    const weightDifference = targetWeight - currentWeight;
    let targetCalories;

    if (goal === 'Weight Gain') {
        targetCalories = this.userData['Calories'] + (weightDifference * 500);
    } else if (goal === 'Weight Loss') {
        targetCalories = this.userData['Calories'] - (weightDifference * 500);
    } else {
        targetCalories = this.userData['Calories'];
    }

    return targetCalories;
}
// NOT USED  IN THIS PROJECT BUT KEPT HERE FOR FUTURE REFERENCE