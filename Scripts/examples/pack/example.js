(function () {

    var optionsPack = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 400,
        width: null,

        chartType: yawd3.chartKind.pack,
        chartId: "#chartPack"
    };

    yawd3.drawChart(optionsPack, packChartData);
    setTimeout(function () { yawd3.updateChart(optionsPack, packChartDataUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsPack, packChartData); }, 4 * 1000);
})();