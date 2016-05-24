(function () {

    var optionsRadial = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 400,
        width: null,

        chartType: yawd3.chartKind.radial,
        chartId: "#diagramRadial"
    };

    yawd3.drawChart(optionsRadial, radialDiagramData);
    setTimeout(function () { yawd3.updateChart(optionsRadial, radialDiagramDataUpdate); }, 2 * 1000);
    setTimeout(function () { yawd3.updateChart(optionsRadial, radialDiagramData); }, 4 * 1000);

})();