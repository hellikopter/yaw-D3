(function (root, factory) {
    if (typeof define === 'function' && define.amd)
        define(['d3'], factory);
    else
        if (typeof exports === 'object')
            module.exports = factory(require('d3'));
        else
            root.yawd3 = factory(root.d3);
}(this, function (d3) {
    "use strict";

    var yawd3 = {
        version: "0.0.1"
    };

    yawd3.chartKind = {
        column: 1,
        line: 2,
        pie: 3,
        bubble: 4,
        pack: 5,
        tree: 6,
        radial: 7,
        chord: 8
    };

    yawd3.defaultOptions = {
        margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        },
        height: 500,
        width: null,

        chartType: null,
        chartId: null,
        hasLegend: true,

        transition: {
            delay: {
                insert: 1500,
                update: 500,
                remove: 500
            },
            exitColour: "#E63232"
        },

        columnChart: {
            isStacked: false
        },

        lineChart: {
            isTimeCategory: false,
            interpolation: "linear",
            categoryTimeFormat: "%Y-%m-%d",
            isArea: false,
            xTicks: 6
        },

        pieChart: {
            isDoughnut: false
        },

        bubbleChart: {
            isTimeCategory: false,
            categoryTimeFormat: "%Y-%m-%d",
            xTicks: 6
        },

        treeDiagram: {
            nodeWidth: 250
        }
    };

    yawd3.drawChart = function (options, data) {
        checkOptions(options);
        options = setToDefaultOptions(options);
        checkDataOptions(options.chartType, data);

        var svg = createChart(options);
        var chart = setupChart(options, data);

        switch (options.chartType) {
            case yawd3.chartKind.column:
                createColumnChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.line:
                createLineChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.pie:
                createPieChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.bubble:
                createBubbleChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.pack:
                createPackChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.tree:
                createTreeDiagram(options, data, svg, chart);
                break;
            case yawd3.chartKind.radial:
                createRadialDiagram(options, data, svg, chart);
                break;
            case yawd3.chartKind.chord:
                createChordDiagram(options, data, svg, chart);
                break;
        }
        if (options.hasLegend == true)
            createLegend(options, data, chart);
    };

    yawd3.updateChart = function (options, data) {
        checkOptions(options);
        options = setToDefaultOptions(options);

        var svg = d3.select(options.chartId + " g");
        if (isNaN(svg.node().getAttribute("data-chart-type")))
            throw new Error("Invalid chart object");
        var chartKindId = svg.node().getAttribute("data-chart-type") * 1;
        checkDataOptions(chartKindId, data);

        var chart = setupChart(options, data);
        switch (chartKindId) {
            case yawd3.chartKind.column:
                updateColumnChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.line:
                updateLineChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.pie:
                updatePieChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.bubble:
                updateBubbleChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.pack:
                updatePackChart(options, data, svg, chart);
                break;
            case yawd3.chartKind.tree:
                throw new Error("Tree diagram cannot be updated");
                break;
            case yawd3.chartKind.radial:
                updateRadialDiagram(options, data, svg, chart);
                break;
            case yawd3.chartKind.tree:
                throw new Error("Chord diagram cannot be updated");
                break;
        }
        if (options.hasLegend == true)
            updateLegend(options, data, chart);
    };

    function checkDataOptions(chartType, data) {
        if (((chartType == yawd3.chartKind.column) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false) ||
            (!data.categories) || (data.categories == null) || (Array.isArray(data.categories) == false))) ||
            ((chartType == yawd3.chartKind.line) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false))) ||
            ((chartType == yawd3.chartKind.pie) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false))) ||
            ((chartType == yawd3.chartKind.bubble) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false))) ||
            ((chartType == yawd3.chartKind.pack) &&
            ((!data) || (data == null) || (Array.isArray(data) == false))) ||
            ((chartType == yawd3.chartKind.tree) &&
            ((!data) || (data == null) || (!data.name) || (data.name == null) || (!data.children) || (data.children == null) || (Array.isArray(data.children) == false))) ||
            ((chartType == yawd3.chartKind.radial) &&
            ((!data) || (data == null) || (!data.children) || (data.children == null) || (Array.isArray(data.children) == false))) ||
            ((chartType == yawd3.chartKind.chord) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false))))
            throw new Error("Invalid data format");
    };

    function checkOptions(options) {
        if ((!options) || (options == null))
            throw new Error("No options");
        if ((!options.chartId) || (options.chartId == null))
            throw new Error("No char element id");
        if ((!options.chartType) || (options.chartType == null))
            throw new Error("No chart type");
        if ((options.chartType != yawd3.chartKind.column) &&
            (options.chartType != yawd3.chartKind.line) &&
            (options.chartType != yawd3.chartKind.pie) &&
            (options.chartType != yawd3.chartKind.bubble) &&
            (options.chartType != yawd3.chartKind.pack) &&
            (options.chartType != yawd3.chartKind.tree) &&
            (options.chartType != yawd3.chartKind.radial) &&
            (options.chartType != yawd3.chartKind.chord))
            throw new Error("Invalid chart type");
        if ((options.hasLegend == true) && (document.getElementById(options.chartId.substr(1) + "Legend") == null))
            throw new Error("Legend element not found");
    };

    function setToDefaultOptions(options) {
        options.margin = options.margin || yawd3.defaultOptions.margin;
        options.margin.top = options.margin.top || yawd3.defaultOptions.margin.top
        options.margin.right = options.margin.right || yawd3.defaultOptions.margin.right
        options.margin.bottom = options.margin.bottom || yawd3.defaultOptions.margin.bottom
        options.margin.left = options.margin.left || yawd3.defaultOptions.margin.left
        options.height = options.height || yawd3.defaultOptions.height;
        options.width = options.width || yawd3.defaultOptions.width;
        options.chartType = options.chartType || yawd3.defaultOptions.chartType;
        options.chartId = options.chartId || yawd3.defaultOptions.chartId;
        if (typeof options.hasLegend != "boolean")
            options.hasLegend = yawd3.defaultOptions.hasLegend;
        options.transition = options.transition || yawd3.defaultOptions.transition;
        options.transition.delay = options.transition.delay || yawd3.defaultOptions.transition.delay;
        options.transition.delay.insert = options.transition.delay.insert || yawd3.defaultOptions.transition.delay.insert;
        options.transition.delay.remove = options.transition.delay.remove || yawd3.defaultOptions.transition.delay.remove;
        options.transition.delay.update = options.transition.delay.update || yawd3.defaultOptions.transition.delay.update;
        options.transition.exitColour = options.transition.exitColour || yawd3.defaultOptions.transition.exitColour;
        if (options.chartType == yawd3.chartKind.column) {
            options.columnChart = options.columnChart || yawd3.defaultOptions.columnChart;
            options.columnChart.isStacked = options.columnChart.isStacked || yawd3.defaultOptions.columnChart.isStacked;
        }
        if (options.chartType == yawd3.chartKind.line) {
            options.lineChart = options.lineChart || yawd3.defaultOptions.lineChart;
            options.lineChart.isTimeCategory = options.lineChart.isTimeCategory || yawd3.defaultOptions.lineChart.isTimeCategory;
            options.lineChart.interpolation = options.lineChart.interpolation || yawd3.defaultOptions.lineChart.interpolation;
            options.lineChart.categoryTimeFormat = options.lineChart.categoryTimeFormat || yawd3.defaultOptions.lineChart.categoryTimeFormat;
            options.lineChart.isArea = options.lineChart.isArea || yawd3.defaultOptions.lineChart.isArea;
            if (options.lineChart.xTicks != null)
                options.lineChart.xTicks = options.lineChart.xTicks || yawd3.defaultOptions.lineChart.xTicks;
        }
        if (options.chartType == yawd3.chartKind.pie) {
            options.pieChart = options.pieChart || yawd3.defaultOptions.pieChart;
            options.pieChart.isDoughnut = options.pieChart.isDoughnut || yawd3.defaultOptions.pieChart.isDoughnut;
        }
        if (options.chartType == yawd3.chartKind.bubble) {
            options.bubbleChart = options.bubbleChart || yawd3.defaultOptions.bubbleChart;
            options.bubbleChart.isTimeCategory = options.bubbleChart.isTimeCategory || yawd3.defaultOptions.bubbleChart.isTimeCategory;
            options.bubbleChart.categoryTimeFormat = options.bubbleChart.categoryTimeFormat || yawd3.defaultOptions.bubbleChart.categoryTimeFormat;
            if (options.bubbleChart.xTicks != null)
                options.bubbleChart.xTicks = options.bubbleChart.xTicks || yawd3.defaultOptions.bubbleChart.xTicks;
        }
        if (options.chartType == yawd3.chartKind.tree) {
            options.treeDiagram = options.treeDiagram || yawd3.defaultOptions.treeDiagram;
            options.treeDiagram.nodeWidth = options.treeDiagram.nodeWidth || yawd3.defaultOptions.treeDiagram.nodeWidth;
        }
        return options;
    };

    function createChart(options) {
        options.width = options.width || d3.select(options.chartId).node().getBoundingClientRect().width - options.margin.left - options.margin.right;

        var svg = d3.select(options.chartId)
            .attr("width", (options.width + options.margin.left + options.margin.right))
            .attr("height", (options.height + options.margin.top + options.margin.bottom))
            .attr("viewBox", "0 0 " + (options.width + options.margin.left + options.margin.right) + " " + (options.height + options.margin.top + options.margin.bottom))
            .append("g")
            .attr("data-chart-type", options.chartType);

        switch (options.chartType) {
            case yawd3.chartKind.column:
            case yawd3.chartKind.line:
            case yawd3.chartKind.bubble:
            case yawd3.chartKind.pack:
            case yawd3.chartKind.tree:
                svg.attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");
                break;
            case yawd3.chartKind.pie:
            case yawd3.chartKind.radial:
            case yawd3.chartKind.chord:
                svg.attr("transform", "translate(" + (options.width / 2) + "," + (options.height / 2) + ")");
                break;
        }

        return svg;
    };

    function setupChart(options, data) {
        var chart = null;

        switch (options.chartType) {
            case yawd3.chartKind.column:
                chart = setupColumnChart(data, options.columnChart.isStacked, options.height, options.width);
                break;
            case yawd3.chartKind.line:
                chart = setupLineChart(data, options.lineChart.isTimeCategory, options.lineChart.categoryTimeFormat,
                    options.lineChart.interpolation, options.lineChart.isArea, options.lineChart.xTicks, options.height, options.width);
                break;
            case yawd3.chartKind.pie:
                chart = setupPieChart(options.pieChart.isDoughnut, options.height, options.width);
                break;
            case yawd3.chartKind.bubble:
                chart = setupBubbleChart(data, options.bubbleChart.isTimeCategory, options.bubbleChart.categoryTimeFormat,
                options.bubbleChart.xTicks, options.height, options.width);
                break;
            case yawd3.chartKind.pack:
                chart = setupPackChart(data, options.height, options.width);
                break;
            case yawd3.chartKind.tree:
                chart = setupTreeDiagram(data, options.height, options.width);
                break;
            case yawd3.chartKind.radial:
                chart = setupRadialDiagram(data, options.height, options.width);
                break;
            case yawd3.chartKind.chord:
                chart = setupChordDiagram(data, options.height, options.width);
                break;
        }
        return chart;
    };

    //legend

    function getDataForLegend(options, data, chart) {
        var items = [];
        var isColourRange = false;

        if ((options.chartType == yawd3.chartKind.column) ||
            (options.chartType == yawd3.chartKind.line) ||
            (options.chartType == yawd3.chartKind.pie))
            for (var i = 0; i < data.sets.length; i++)
                items.push({
                    name: data.sets[i].name,
                    colour: data.sets[i].colour || d3.scale.category20().range()[i % 20]
                });

        if (options.chartType == yawd3.chartKind.bubble) {
            isColourRange = true;
            for (var i = 0; i < data.sets.length; i++)
                items.push({
                    name: data.sets[i].name,
                    colourMin: chart.colours[data.sets[i].name].range()[0],
                    colourMax: chart.colours[data.sets[i].name].range()[1]
                });
        }

        return {
            items: items,
            isColourRange: isColourRange
        }
    };

    function createLegend(options, data, chart) {
        var legendData = getDataForLegend(options, data, chart);
        var textDistance = 13;

        var legend = d3.select(options.chartId + "Legend")
            .selectAll(".legend")
            .data(legendData.items)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, ix) {
                return "translate(0," + (ix * 15) + ")";
            });

        if (legendData.isColourRange == false)
            legend.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function (d) {
                    return d.colour;
                });
        else {
            legend.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function (d) {
                    return d.colourMin;
                });
            legend.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .attr("transform", "translate(12,0)")
                .style("fill", function (d) {
                    return d.colourMax;
                });
            textDistance = 25;
        }

        legend.append("text")
            .attr("x", textDistance)
            .attr("dy", "0.7em")
            .text(function (d) {
                return d.name;
            });
    };

    function updateLegend(options, data, chart) {
        var legendData = getDataForLegend(options, data, chart);
        var textDistance = 13;

        var legend = d3.select(options.chartId + "Legend")
        .selectAll("g.legend")
        .data(legendData.items, function (d) {
            return d.name;
        });

        var groups = legend.enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, ix) {
                return "translate(0," + (ix * 15) + ")";
            });
        if (legendData.isColourRange == false)
            groups.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function (d) {
                    return d.colour;
                });
        else {
            groups.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function (d) {
                    return d.colourMin;
                });
            groups.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("transform", "translate(12,0)")
            .style("fill", function (d) {
                return d.colourMax;
            });
            textDistance = 25;
        }
        groups.append("text")
            .attr("x", textDistance)
            .attr("dy", "0.7em")
            .text(function (d) {
                return d.name;
            });

        legend.exit()
                    .remove();
    };

    //column

    function setupColumnChart(data, isStacked, height, width) {
        var x = d3.scale.ordinal()
            .domain(data.categories.map(function (d) {
                return d;
            }))
            .rangeRoundBands([0, width], .1);

        var xGroup = d3.scale.ordinal()
            .domain(data.sets.map(function (d) {
                return d.name;
            }))
            .rangeRoundBands([0, x.rangeBand()], .1);

        var maxValue = 0;

        if (isStacked == true)
            maxValue = d3.max(data.categories, function (item, ix) {
                return d3.sum(data.sets, function (set) {
                    return set.values[ix];
                });
            });
        else
            maxValue = d3.max(data.sets, function (item) {
                return d3.max(item.values);
            });

        var y = d3.scale.linear()
            .domain([0, maxValue])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
                .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .innerTickSize(10)
            .ticks(10)
            .orient("left");

        return {
            x: x,
            xGroup: xGroup,
            y: y,
            xAxis: xAxis,
            yAxis: yAxis
        }
    };

    function createColumnChart(options, data, svg, chart) {
        var categories = svg.selectAll("g.category")
            .data(data.categories, function (d) {
                return d;
            })
            .enter()
            .append("g")
            .attr("class", "category")
            .attr("transform", function (d) {
                return "translate(" + chart.x(d) + ",0)";
            });

        categories.selectAll("rect")
            .data(data.sets, function (d) { return d.name; })
            .enter()
            .append("rect")
            .attr("class", "column")
            .style("fill", function (d, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20];
            })
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? chart.x(d.name) : chart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? chart.x.rangeBand() : chart.xGroup.rangeBand();
            })
            .attr("height", 0)
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx), function (set) {
                        return options.height - chart.y(set.values[catIx]);
                    });
                else
                    return options.height;
            })
            .transition()
            .duration(options.transition.delay.insert)
            .attr("height", function (d, setIx, catIx) {
                return options.height - chart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) {
                        return options.height - chart.y(set.values[catIx]);
                    });
                else
                    return chart.y(d.values[catIx]);
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(chart.xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(chart.yAxis);
    };

    function updateColumnChart(options, data, svg, chart) {
        svg.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.xAxis);

        svg.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.yAxis);

        var categories = svg.selectAll("g.category")
            .data(data.categories, function (d) {
                return d;
            });

        categories.transition()
            .duration(options.transition.delay.update)
            .attr("transform", function (d) {
                return "translate(" + chart.x(d) + ",0)";
            });

        categories.enter()
            .append("g")
            .attr("class", "category")
            .attr("transform", function (d) {
                return "translate(" + chart.x(d) + ",0)";
            });

        var columns = categories.selectAll("rect.column")
            .data(data.sets, function (d) {
                return d.name;
            });

        columns.exit()
            .style("fill", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
            .attr("y", chart.y(0))
            .attr("height", options.height - chart.y(0))
                            .remove();

        columns.transition()
            .duration(options.transition.delay.update)
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? chart.x(d.name) : chart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? chart.x.rangeBand() : chart.xGroup.rangeBand();
            })
            .attr("height", function (d, setIx, catIx) {
                return options.height - chart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) {
                        return options.height - chart.y(set.values[catIx]);
                    });
                else
                    return chart.y(d.values[catIx]);
            });

        columns.enter()
            .append("rect")
            .attr("class", "column")
            .style("fill", function (d, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20];
            })
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? chart.x(d.name) : chart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? chart.x.rangeBand() : chart.xGroup.rangeBand();
            })
            .attr("height", 0)
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx), function (set) {
                        return options.height - chart.y(set.values[catIx]);
                    });
                else
                    return options.height;
            })
            .transition()
            .duration(options.transition.delay.insert)
            .attr("height", function (d, setIx, catIx) {
                return options.height - chart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) {
                        return options.height - chart.y(set.values[catIx]);
                    });
                else
                    return chart.y(d.values[catIx]);
            });

        categories.exit()
                            .remove();
    };

    //line

    function setupLineChart(data, isTimeCategory, categoryTimeFormat, interpolation, isArea,
        xTicks, height, width) {
        var x = null;
        var xMinValue = null;
        var xMaxValue = null;
        var yMinValue = null;
        var yMaxValue = null;

        xMinValue = d3.min(data.sets, function (set) {
            return d3.min(set.values, function (val) {
                return isTimeCategory == true ? d3.time.format(categoryTimeFormat).parse(val.x) : val.x;
            });
        });

        xMaxValue = d3.max(data.sets, function (set) {
            return d3.max(set.values, function (val) {
                return isTimeCategory == true ? d3.time.format(categoryTimeFormat).parse(val.x) : val.x;
            });
        });

        yMinValue = d3.min(data.sets, function (set) {
            return d3.min(set.values, function (val) {
                return val.y;
            });
        });

        yMaxValue = d3.max(data.sets, function (set) {
            return d3.max(set.values, function (val) {
                return val.y;
            });
        });

        if (isTimeCategory == true)
            x = d3.time.scale()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);
        else
            x = d3.scale.linear()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);

        var y = d3.scale.linear()
            .domain([yMinValue, yMaxValue])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
                .ticks(xTicks);

        var yAxis = d3.svg.axis()
            .scale(y)
            .innerTickSize(10)
            .ticks(10)
            .orient("left");

        var line = null;

        if (isArea == true)
            line = d3.svg.area()
                .interpolate(interpolation)
                .x(function (d) {
                    if (isTimeCategory == true)
                        return x(d3.time.format(categoryTimeFormat).parse(d.x));
                    else
                        return x(d.x);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.y);
                });
        else
            line = d3.svg.line()
                .interpolate(interpolation)
                .x(function (d) {
                    if (isTimeCategory == true)
                        return x(d3.time.format(categoryTimeFormat).parse(d.x));
                    else
                        return x(d.x);
                })
                .y(function (d) {
                    return y(d.y);
                });

        return {
            x: x,
            y: y,
            xAxis: xAxis,
            yAxis: yAxis,
            line: line
        }
    };

    function createLineChart(options, data, svg, chart) {
        svg.selectAll(".line")
            .data(data.sets, function (d) {
                return d.name;
            })
            .enter()
            .append("g")
            .attr("class", "line")
            .append("path")
            .style("fill", function (d, ix) {
                if (options.lineChart.isArea == true)
                    return d.colour || d3.scale.category20().range()[ix % 20];
                else
                    return "none";
            })
            .style("opacity", function (d, ix) {
                if (options.lineChart.isArea == true)
                    return 0.8;
                else
                    return 1;
            })
            .attr("d", function (d) {
                return chart.line(d.values);
            })
            .style("stroke", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(chart.xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(chart.yAxis);
    };

    function updateLineChart(options, data, svg, chart) {
        svg.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.xAxis);

        svg.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.yAxis);

        var sets = svg.selectAll("g.line")
            .data(data.sets, function (d) {
                return d.name;
            });

        sets.exit()
            .selectAll("path")
            .style("stroke-width", 3)
            .style("stroke", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
                            .remove();

        sets.enter()
            .append("g")
            .attr("class", "line")
            .append("path")
            .style("fill", function (d, ix) {
                if (options.lineChart.isArea == true)
                    return d.colour || d3.scale.category20().range()[ix % 20];
                else
                    return "none";
            })
            .style("opacity", function (d, ix) {
                if (options.lineChart.isArea == true)
                    return 0.8;
                else
                    return 1;
            });

        sets.selectAll("path")
            .transition()
            .duration(options.transition.delay.update)
            .ease("linear")
            .attr("d", function (d, catIx, setIx) {
                return chart.line(data.sets[setIx].values);
            })
            .style("stroke", function (d, catIx, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20];
            });

        sets.exit()
                    .remove();
    };

    //pie

    function setupPieChart(isDoughnut, height, width) {
        var radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
                .outerRadius(radius * 0.99)
                .innerRadius(isDoughnut == true ? radius * 0.6 : 0);

        var pie = d3.layout.pie()
                .value(function (d) {
                    return d.value;
                })
                .sort(null);

        var arcTween = function (a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);

            return function (t) {
                return arc(i(t));
            };
        };

        return {
            arc: arc,
            pie: pie,
            arcTween: arcTween
        }
    };

    function createPieChart(options, data, svg, chart) {
        svg.selectAll("path")
            .data(chart.pie(data.sets), function (d) {
                return d.data.name;
            })
            .enter()
            .append("path")
            .attr("class", "pie")
            .attr("d", chart.arc)
            .style("fill", function (d, ix) {
                return d.data.fill || d3.scale.category20().range()[ix % 20];
            })
            .each(function (d) {
                this._current = d;
            });
    };

    function updatePieChart(options, data, svg, chart) {
        var sets = svg.selectAll("path.pie")
            .data(chart.pie(data.sets), function (d) {
                return d.data.name;
            });

        sets.exit()
            .style("fill", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
                    .remove();

        sets.enter()
            .append("path")
            .attr("class", "pie")
            .attr("d", chart.arc)
            .style("fill", function (d, ix) {
                return d.data.fill || d3.scale.category20().range()[ix % 20];
            })
            .each(function (d) {
                this._current = d;
            });

        sets.transition()
            .duration(options.transition.delay.update)
            .attrTween("d", chart.arcTween)
            .attr("transform", null);

    };

    //bubble

    function setupBubbleChart(data, isTimeCategory, categoryTimeFormat, xTicks, height, width) {
        var x = null;
        var xMinValue = null;
        var xMaxValue = null;
        var yMinValue = null;
        var yMaxValue = null;
        var colours = {
        };

        var minX = function (values) {
            return d3.min(values, function (val) {
                if (isTimeCategory == true)
                    return d3.time.format(categoryTimeFormat).parse(val.x);
                else
                    return val.x;
            });
        };

        var maxX = function (values) {
            return d3.max(values, function (val) {
                if (isTimeCategory == true)
                    return d3.time.format(categoryTimeFormat).parse(val.x);
                else
                    return val.x;
            });
        };

        var minY = function (values) {
            return d3.min(values, function (val) {
                return val.y;
            });
        };

        var maxY = function (values) {
            return d3.max(values, function (val) {
                return val.y;
            });
        };

        xMinValue = d3.min(data.sets, function (set) {
            return minX(set.values);
        });

        xMaxValue = d3.max(data.sets, function (set) {
            return maxX(set.values);
        });

        yMinValue = d3.min(data.sets, function (set) {
            return minY(set.values);
        });

        yMaxValue = d3.max(data.sets, function (set) {
            return maxY(set.values);
        });

        if (isTimeCategory == true)
            x = d3.time.scale()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);
        else
            x = d3.scale.linear()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);

        var y = d3.scale.linear()
            .domain([yMinValue, yMaxValue])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
                .ticks(xTicks);

        var yAxis = d3.svg.axis()
            .scale(y)
            .innerTickSize(10)
            .ticks(10)
            .orient("left");

        var selectedSetValues = function (name) {
            return data.sets.filter(function (set) {
                return set.name == name;
            })[0].values;
        };

        for (var i = 0; i < data.sets.length; i++) {
            var colour = data.sets[i].colour || d3.scale.category20().range()[i % 20];

            colours[data.sets[i].name] = d3.scale.linear()
                .domain([
                    minY(data.sets[i].values),
                    maxY(data.sets[i].values)
                ])
                .range([
                    d3.rgb(colour).brighter(),
                    d3.rgb(colour).darker(2)
                ]);
        }

        return {
            x: x,
            y: y,
            xAxis: xAxis,
            yAxis: yAxis,
            selectedSetValues: selectedSetValues,
            colours: colours
        }
    }

    function createBubbleChart(options, data, svg, chart) {
        var sets = svg.selectAll(".bubble")
            .data(data.sets.map(function (d) {
                return d.name;
            }))
            .enter()
            .append("g")
            .attr("class", "bubble");

        sets.selectAll("circle")
            .data(chart.selectedSetValues, function (d) {
                return d.x + ":" + d.y;
            })
            .enter()
            .append("circle")
            .style("fill", function (d, catIx, setIx) {
                return chart.colours[data.sets[setIx].name](d.y);
            })
            .style("opacity", 0.8)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - chart.y(d.size)), 1]);
            })
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return chart.x(x);
            })
            .attr("cy", function (d) {
                return chart.y(d.y);
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(chart.xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(chart.yAxis);
    };

    function updateBubbleChart(options, data, svg, chart) {
        svg.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.xAxis);

        svg.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(chart.yAxis);

        var sets = svg.selectAll("g.bubble")
            .data(data.sets.map(function (d) {
                return d.name;
            }));

        sets.exit()
            .transition()
            .duration(options.transition.delay.remove)
                            .remove();

        sets.enter()
            .append("g")
            .attr("class", "bubble");

        var values = sets.selectAll("circle")
            .data(chart.selectedSetValues, function (d) {
                return d.x + ":" + d.y;
            });

        values.exit()
            .style("fill", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
                            .remove();

        values.enter()
            .append("circle")
            .style("fill", function (d, catIx, setIx) {
                return chart.colours[data.sets[setIx].name](d.y);
            })
            .style("opacity", 0.8)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - chart.y(d.size)), 1]);
            })
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return chart.x(x);
            })
            .attr("cy", function (d) {
                return chart.y(d.y);
            });

        values.transition()
            .duration(options.transition.delay.update)
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return chart.x(x);
            })
            .attr("cy", function (d) {
                return chart.y(d.y);
            })
            .transition()
            .duration(options.transition.delay.update)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - chart.y(d.size)), 1]);
            });
    };

    //pack

    function setupPackChart(data, height, width) {
        var diameter = d3.min([width, height]);

        var pack = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .value(function (d) {
                return d.size;
            });

        return {
            pack: pack
        }
    };

    function createPackChart(options, data, svg, chart) {
        var bubbles = svg.selectAll(".bubble")
            .data(chart.pack.nodes({
                name: "ROOT", children: data
            }), function (d) {
                return d.name;
            })
            .enter()
            .append("g")
            .attr("class", "bubble")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        bubbles.append("circle")
            .attr("r", 0)
            .style("fill", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .style("fill-opacity", function (d, ix) {
                if (ix == 0)
                    return 0;
                else
                    return 0.8;
            })
            .style("stroke", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .style("stroke-width", function (d, ix) {
                if (ix == 0)
                    return 0;
                else
                    return 2;
            })
            .transition()
            .duration(options.transition.delay.insert)
            .attr("r", function (d) {
                return d.r;
            });

    };

    function updatePackChart(options, data, svg, chart) {
        var bubbles = svg.selectAll("g.bubble")
            .data(chart.pack.nodes({
                name: "ROOT", children: data
            }), function (d) {
                return d.name;
            });

        var newBubbles = bubbles.enter()
            .append("g")
            .attr("class", "bubble")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        bubbles.exit()
            .select("circle")
            .style("fill", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
            .attr("r", 0)
                        .remove();

        bubbles.exit()
            .remove();

        bubbles.transition()
            .duration(options.transition.delay.update)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        bubbles.selectAll("circle")
            .data(packChart.pack.nodes({
                name: "ROOT", children: data
            }), function (d) {
                return d.name;
            })
            .transition()
            .duration(options.transition.delay.update)
            .attr("r", function (d) {
                return d.r;
            });

        newBubbles.append("circle")
            .attr("r", 0)
            .style("fill", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .style("fill-opacity", 0.8)
            .style("stroke", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .style("stroke-width", 2)
            .transition()
            .duration(options.transition.delay.insert)
            .attr("r", function (d) {
                return d.r;
            });

    };

    //tree

    function setupTreeDiagram(data, height, width) {
        var tree = d3.layout.tree()
            .size([height - 20, width - 20]);

        var diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

        return {
            tree: tree,
            diagonal: diagonal
        }
    };

    function createTreeDiagram(options, data, svg, chart) {
        var nodes = chart.tree
            .nodes(data)
            .reverse();

        var links = chart.tree
            .links(nodes);

        nodes.forEach(function (d) {
            d.y = d.depth * options.treeDiagram.nodeWidth;
        });

        var nodesElements = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodesElements.append("circle")
                        .attr("r", 5);

        nodesElements.append("text")
            .attr("x", 13)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.name;
            });

        svg.selectAll(".link")
            .data(links)
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", chart.diagonal);
    };

    //radial

    function setupRadialDiagram(data, height, width) {
        var radius = d3.min([width, height]) / 2;

        var partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function (d) {
                return d.size;
            });

        var arc = d3.svg.arc()
            .startAngle(function (d) {
                return d.x;
            })
            .endAngle(function (d) {
                return d.x + d.dx;
            })
            .innerRadius(function (d) {
                return Math.sqrt(d.y);
            })
            .outerRadius(function (d) {
                return Math.sqrt(d.y + d.dy);
            });

        var arcTween = function (a) {
            var selfArc = this;
            var i = d3.interpolate({
                x: selfArc._current.x,
                dx: selfArc._current.dx
            }, a);

            return function (t) {
                selfArc._current = i(t);
                return arc(i(t));
            };
        };

        return {
            partition: partition,
            arc: arc,
            arcTween: arcTween
        }
    };

    function createRadialDiagram(options, data, svg, chart) {
        var nodes = chart.partition
            .nodes(data)
            .filter(function (d) {
                return d.name;
            });

        var arcs = svg.selectAll(".sequence")
            .data(nodes, function (d) {
                return d.name;
            })
            .enter()
            .append("path")
            .attr("class", "sequence")
            .style("fill", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .attr("d", chart.arc)
            .each(function (d) {
                this._current = d;
            });
    };

    function updateRadialDiagram(options, data, svg, chart) {
        var nodes = chart.partition
            .nodes(data)
            .filter(function (d) {
                return d.name;
            });

        var sequences = svg.selectAll("path.sequence")
            .data(nodes, function (d) {
                return d.name;
            });

        sequences.enter()
            .append("path")
            .attr("class", "sequence")
            .style("fill", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20];
            })
            .attr("d", chart.arc)
            .each(function (d) {
                this._current = d;
            });

        sequences.exit()
            .style("fill", options.transition.exitColour)
            .transition()
            .duration(options.transition.delay.remove)
                    .remove();

        sequences.transition()
            .duration(options.transition.delay.update)
            .attrTween("d", chart.arcTween)
        .attr("transform", null);

    };

    //chord

    function setupChordDiagram(data, height, width) {
        var radius = Math.min(width, height) / 2;
        var matrix = [];
        var keys = {};
        var colours = {
        };

        for (var i = 0; i < data.sets.length; i++) {
            matrix.push([]);
            keys[data.sets[i].id.toString()] = i;
            colours[i.toString()] = data.sets[i].colour || d3.scale.category20().range()[i % 20];
            data.sets[i]._relations = [];
        }
        for (var i = 0; i < data.sets.length; i++)
            for (var j = 0; j < data.sets[i].relations.length; j++) {
                data.sets[i]._relations.push(keys[data.sets[i].relations[j].toString()]);
            }
        for (var i = 0; i < data.sets.length; i++)
            for (var j = 0; j < data.sets.length; j++)
                if (data.sets[j]._relations.indexOf(i) >= 0)
                    matrix[i].push(1);
                else
                    matrix[i].push(0);

        var chord = d3.layout.chord()
            .padding(0.02);

        var arc = d3.svg.arc()
            .innerRadius(radius * 0.8)
            .outerRadius(radius);

        var linkArc = d3.svg.chord()
            .radius(radius * 0.8);

        return {
            colours: colours,
            matrix: matrix,
            chord: chord,
            arc: arc,
            linkArc: linkArc
        }
    };

    function createChordDiagram(options, data, svg, chart) {
        var nodes = chart.chord.matrix(chordDiagram.matrix);

        svg.selectAll("g")
            .data(nodes.groups)
            .enter()
            .append("g")
            .append("path")
            .attr("class", "node")
            .style("fill", function (d) {
                return chart.colours[d.index.toString()];
            })
            .attr("d", chart.arc)

        svg.selectAll(".link")
            .data(nodes.chords)
            .enter()
            .append("path")
            .attr("class", "link")
            .style("fill", function (d) {
                return chart.colours[d.source.index.toString()];
            })
            .style("fill-opacity", 0.8)
            .style("stroke-width", 0)
            .attr("d", chart.linkArc);
    };

    return yawd3;

}));