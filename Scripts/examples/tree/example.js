(function () {

    var optionsTree = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 400,
        width: null,

        chartType: yawd3.chartKind.tree,
        chartId: "#diagramTree"
    };

    yawd3.drawChart(optionsTree, treeDiagramData);
    
})();