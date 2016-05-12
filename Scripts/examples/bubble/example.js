(function () {

    var optionsBubbleValue = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

        chartType: yawd3.chartKind.bubble,
        chartId: "#chartBubbleValue"
    };

    var optionsBubbleDate = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 300,
        width: null,

        chartType: yawd3.chartKind.bubble,
        chartId: "#chartBubbleDate",

        bubbleChart: {
            isTimeCategory: true
        }
    };
    
    yawd3.drawChart(optionsBubbleValue, bubbleChartDataValue);
    setTimeout(function () { yawd3.updateChart(optionsBubbleValue, bubbleChartDataValueUpdate); }, 2 * 1000);

    yawd3.drawChart(optionsBubbleDate, bubbleChartDataDate);
    setTimeout(function () { yawd3.updateChart(optionsBubbleDate, bubbleChartDataDateUpdate); }, 2 * 1000);

})();