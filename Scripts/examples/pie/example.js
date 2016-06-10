(function () {

    var optionsPie = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,

        chartType: yawd3.chartKind.pie,
        chartId: "#chartPie"
    };

    var optionsDoughnut = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,

        chartType: yawd3.chartKind.pie,
        chartId: "#chartDoughnut",

        pieChart: {
            isDoughnut: true
        }
    };

    yawd3.drawChart(optionsPie, pieChartData);
    setTimeout(function () { yawd3.updateChart(optionsPie, pieChartDataUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsPie, pieChartData); }, 4 * 1000);

    yawd3.drawChart(optionsDoughnut, pieChartData);
    setTimeout(function () { yawd3.updateChart(optionsDoughnut, pieChartDataUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsDoughnut, pieChartData); }, 4 * 1000);

})();