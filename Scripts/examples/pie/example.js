(function () {

    var optionsPie = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

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
        width: null,

        chartType: yawd3.chartKind.pie,
        chartId: "#chartDoughnut",

        pieChart: {
            isDoughnut: true
        }
    };

    yawd3.drawChart(optionsPie, pieChartData);
    setTimeout(function () { yawd3.updateChart(optionsPie, pieChartDataUpdate); }, 2 * 1000);

    yawd3.drawChart(optionsDoughnut, pieChartData);
    setTimeout(function () { yawd3.updateChart(optionsDoughnut, pieChartDataUpdate); }, 2 * 1000);

})();