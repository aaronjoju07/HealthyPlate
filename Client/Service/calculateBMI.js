export const calculateBMI = (weight, height) => {
    // Calculate BMI using weight (in kg) and height (in cm)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(bmi.toFixed(2)); 

    let category;
    if (roundedBMI < 18.5) {
        category = 'Underweight';
    } else if (roundedBMI < 25) {
        category = 'Normal weight';
    } else if (roundedBMI < 30) {
        category = 'Overweight';
    } else if (roundedBMI < 35) {
        category = 'Obesity I';
    } else if (roundedBMI < 40) {
        category = 'Obesity II';
    } else {
        category = 'Obesity III';
    }

    return category ;
};
