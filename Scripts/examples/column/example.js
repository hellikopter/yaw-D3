﻿(function(){

    var optionsSimple = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

        chartType: yawd3.chartKind.column,
        chartId: "#chartSimple"
    };

    var optionsGrouped = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

        chartType: yawd3.chartKind.column,
        chartId: "#chartGrouped",

        columnChart: {
            isStacked: false
        }
    };

    var optionsStacked = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

        chartType: yawd3.chartKind.column,
        chartId: "#chartStacked",

        columnChart: {
            isStacked: true
        }
    };

    yawd3.drawChart(optionsSimple, columnChartDataSimple);
    setTimeout(function () { yawd3.updateChart(optionsSimple, columnChartDataSimpleUpdate); }, 2 * 1000);

    yawd3.drawChart(optionsGrouped, columnChartData);
    setTimeout(function () { yawd3.updateChart(optionsGrouped, columnChartDataUpdate); }, 2 * 1000);

    yawd3.drawChart(optionsStacked, columnChartData);
    setTimeout(function () { yawd3.updateChart(optionsStacked, columnChartDataUpdate); }, 2 * 1000);

})();