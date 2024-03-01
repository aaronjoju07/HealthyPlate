export function calculateTrackingType(targetedWeight, currentWeight) {
    return targetedWeight < currentWeight ? 'Weight Loss' : 'Weight Gain';
}