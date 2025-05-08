import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

/**
 * PieChartView renders a pie chart of subject-level or grade-level lesson counts.
 * 
 * Props:
 * - data: Array of objects with shape { name: string, count: number }
 */
const PieChartView = ({ data }) => {
    const screenWidth = Dimensions.get("window").width;

    const colors = [
        "#4e79a7", // blue
        "#f28e2b", // orange
        "#e15759", // red
        "#76b7b2", // teal
        "#59a14f", // green
        "#edc949", // yellow
        "#af7aa1", // purple
        "#ff9da7", // pink
        "#9c755f", // brown
        "#bab0ac", // light gray
        "#2b908f", // cyan
        "#90ed7d", // light green
        "#f45b5b", // coral
        "#8085e9", // lavender blue
        "#f7a35c", // peach
        "#7cb5ec"  // light blue
    ];

    const chartData = data.map((item, index) => ({
        name: `${item.name}: ${item.count}`, // Clean label format
        population: item.count,
        color: colors[index % colors.length],
        legendFontColor: "#ffffff",
        legendFontSize: 11,
    }));

    return (
        <PieChart
            data={chartData}
            width={screenWidth - 32}
            height={240}
            chartConfig={{
                backgroundColor: "transparent",
                color: () => "#ffffff",
                labelColor: () => "#ffffff",
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            absolute={false}
            hasLegend={true}
        />
    );
};

export default PieChartView;
