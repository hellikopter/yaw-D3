(function () {

    var optionsChord = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        },
        height: 400,
        width: null,

        chartType: yawd3.chartKind.chord,
        chartId: "#diagramChord"
    };

    yawd3.drawChart(optionsChord, chordDiagramData);

})();