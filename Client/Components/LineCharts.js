import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
const { width, height } = Dimensions.get("window");

const LineCharts = () => {
  return (
    <View>
      {/* Line chart for complete goal progression */}
      <LineChart
        data={{ labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ data: [20, 45, 28, 80, 99] }] }}
        width={width - 10}
        height={200}
        style={{ padding: 2, borderRadius: 10 }}
        yAxisLabel="%"
        withInnerLines={false}
        chartConfig={{ backgroundColor: 'transparent', backgroundGradientFrom: '#ffffff', backgroundGradientTo: '#ffffff', decimalPlaces: 0, color: (opacity = 1) => `rgba(255, 199, 0, ${opacity})` }}
      />

      {/* Line chart for daily progression */}
      <LineChart
        data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data: [10, 15, 20, 18, 25, 30, 28] }] }}
        width={width - 10}
        height={200}
        style={{ borderRadius: 10, padding: 2 }}
        yAxisLabel="%"
        withInnerLines={false}
        chartConfig={{ backgroundColor: 'transparent', backgroundGradientFrom: '#ffffff', backgroundGradientTo: '#ffffff', decimalPlaces: 0, color: (opacity = 1) => `rgba(255, 199, 0, ${opacity})` }}
      />
    </View>
  );
};

export default LineCharts;
