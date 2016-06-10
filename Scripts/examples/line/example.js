(function () {

    var optionsLinearDate = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartLinearDate",

        lineChart: {
            isTimeCategory: true,
            interpolation: "linear",
            xTicks: 6
        }
    };

    var optionsLinearValue = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartLinearValue",

        lineChart: {
            interpolation: "linear"
        }
    };

    var optionsBasisDate = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartBasisDate",

        lineChart: {
            isTimeCategory: true,
            interpolation: "basis",
            xTicks: 6
        }
    };

    var optionsBasisValue = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartBasisValue",

        lineChart: {
            interpolation: "basis"
        }
    };

    var optionsStepDate = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartStepDate",

        lineChart: {
            isTimeCategory: true,
            interpolation: "step",
            xTicks: 6
        }
    };

    var optionsStepValue = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartStepValue",

        lineChart: {
            interpolation: "step"
        }
    };

    var optionsLinearAreaDate = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartLinearAreaDate",

        lineChart: {
            isTimeCategory: true,
            interpolation: "linear",
            isArea: true,
            xTicks: 6
        }
    };

    var optionsLinearAreaValue = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 200,
        width: 500,

        chartType: yawd3.chartKind.line,
        chartId: "#chartLinearAreaValue",

        lineChart: {
            interpolation: "linear",
            isArea: true
        }
    };

    yawd3.drawChart(optionsLinearDate, lineChartDataDate);
    setTimeout(function () { yawd3.updateChart(optionsLinearDate, lineChartDataDateUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsLinearDate, lineChartDataDate); }, 4 * 1000);
    
    yawd3.drawChart(optionsLinearValue, lineChartDataValue);
    setTimeout(function () { yawd3.updateChart(optionsLinearValue, lineChartDataValueUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsLinearValue, lineChartDataValue); }, 4 * 1000);

    yawd3.drawChart(optionsBasisDate, lineChartDataDate);
    setTimeout(function () { yawd3.updateChart(optionsBasisDate, lineChartDataDateUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsBasisDate, lineChartDataDate); }, 4 * 1000);

    yawd3.drawChart(optionsBasisValue, lineChartDataValue);
    setTimeout(function () { yawd3.updateChart(optionsBasisValue, lineChartDataValueUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsBasisValue, lineChartDataValue); }, 4 * 1000);

    yawd3.drawChart(optionsStepDate, lineChartDataDate);
    setTimeout(function () { yawd3.updateChart(optionsStepDate, lineChartDataDateUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsStepDate, lineChartDataDate); }, 4 * 1000);

    yawd3.drawChart(optionsStepValue, lineChartDataValue);
    setTimeout(function () { yawd3.updateChart(optionsStepValue, lineChartDataValueUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsStepValue, lineChartDataValue); }, 4 * 1000);

    yawd3.drawChart(optionsLinearAreaDate, lineChartDataDate);
    setTimeout(function () { yawd3.updateChart(optionsLinearAreaDate, lineChartDataDateUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsLinearAreaDate, lineChartDataDate); }, 4 * 1000);

    yawd3.drawChart(optionsLinearAreaValue, lineChartDataValue);
    setTimeout(function () { yawd3.updateChart(optionsLinearAreaValue, lineChartDataValueUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsLinearAreaValue, lineChartDataValue); }, 4 * 1000);
    
})();