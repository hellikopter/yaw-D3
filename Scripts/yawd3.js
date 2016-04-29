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
        column: 1
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

        transition: {
            delay: {
                insert: 1500,
                update: 500,
                remove: 500
            }
        },

        columnChart: {
            isStacked: false
        }
    };

    yawd3.drawChart = function (options, data) {
        checkOptions(options);
        options = setToDefaultOptions(options);
        checkDataOptions(options.chartType, data);

        switch (options.chartType) {
            case yawd3.chartKind.column:
                createColumnChart(options, data);
                break;
        }
    };

    yawd3.updateChart = function (options, data) {
        var chart = d3.select(options.chartId + " g");
        if (isNaN(chart.node().getAttribute("data-chart-type")))
            throw new Error("Invalid chart object");
        checkDataOptions(chart.node().getAttribute("data-chart-type") * 1, data);

        switch (chart.node().getAttribute("data-chart-type") * 1) {
            case yawd3.chartKind.column:
                updateColumnChart(options, data);
                break;
        }
    };

    function checkDataOptions(chartType, data) {
        if ((chartType == yawd3.chartKind.column) &&
            ((!data) || (data == null) || (!data.sets) || (data.sets == null) || (Array.isArray(data.sets) == false) ||
            (!data.categories) || (data.categories == null) || (Array.isArray(data.categories) == false)))
            throw new Error("Invalid data format");
    };

    function checkOptions(options) {
        if ((!options) || (options == null))
            throw new Error("No options");
        if ((!options.chartId) || (options.chartId == null))
            throw new Error("No char element id");
        if ((!options.chartType) || (options.chartType == null))
            throw new Error("No chart type");
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
        options.transition = options.transition || yawd3.defaultOptions.transition;
        options.transition.delay = options.transition.delay || yawd3.defaultOptions.transition.delay;
        options.transition.delay.insert = options.transition.delay.insert || yawd3.defaultOptions.transition.delay.insert;
        options.transition.delay.remove = options.transition.delay.remove || yawd3.defaultOptions.transition.delay.remove;
        options.transition.delay.update = options.transition.delay.update || yawd3.defaultOptions.transition.delay.update;
        if (options.chartType == yawd3.chartKind.column) {
            options.columnChart = options.columnChart || yawd3.defaultOptions.columnChart;
            options.columnChart.isStacked = options.columnChart.isStacked || yawd3.defaultOptions.columnChart.isStacked;
        }

        return options;
    };

    function chartSetup(options) {
        options.width = options.width || d3.select(options.chartId).node().getBoundingClientRect().width - options.margin.left - options.margin.right;

        var chart = d3.select(options.chartId)
            .attr("width", (options.width + options.margin.left + options.margin.right))
            .attr("height", (options.height + options.margin.top + options.margin.bottom))
            .attr("viewBox", "0 0 " + (options.width + options.margin.left + options.margin.right) + " " + (options.height + options.margin.top + options.margin.bottom))
            .append("g")
            .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")")
            .attr("data-chart-type", options.chartType);

        return chart;
    };

    function setupColumnChart(data, isStacked, height, width) {
        var x = d3.scale.ordinal()
            .domain(data.categories.map(function (d) {
                return d.name;
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

    function createColumnChart(options, data) {
        var chart = chartSetup(options);
        var columnChart = setupColumnChart(data, options.columnChart.isStacked, options.height, options.width);

        var categories = chart.selectAll("g.category")
            .data(data.categories, function (d) {
                return d.name;
            })
            .enter()
            .append("g")
            .attr("class", "category")
            .attr("transform", function (d) {
                return "translate(" + columnChart.x(d.name) + ",0)";
            });

        categories.selectAll("rect")
            .data(data.sets, function (d) { return d.name; })
            .enter()
            .append("rect")
            .attr("class", "column")
            .style("fill", function (d, setIx) {
                return d.fill || d3.scale.category20().range()[setIx % 20];
            })
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? columnChart.x(d.name) : columnChart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? columnChart.x.rangeBand() : columnChart.xGroup.rangeBand();
            })
            .attr("height", 0)
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx), function (set) { return options.height - columnChart.y(set.values[catIx]); });
                else
                    return options.height;
            })
            .transition()
            .duration(options.transition.delay.insert)
            .attr("height", function (d, setIx, catIx) {
                return options.height - columnChart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) { return options.height - columnChart.y(set.values[catIx]); });
                else
                    return columnChart.y(d.values[catIx]);
            });

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(columnChart.xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(columnChart.yAxis);
    };

    function updateColumnChart(options, data) {
        var columnChart = setupColumnChart(data, options.columnChart.isStacked, options.height, options.width);

        var chart = d3.select(options.chartId + " g");

        chart.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(columnChart.xAxis);

        chart.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(columnChart.yAxis);

        var categories = chart.selectAll("g.category")
            .data(data.categories, function (d) {
                return d.name;
            });

        categories.transition()
            .duration(options.transition.delay.update)
            .attr("transform", function (d) {
                return "translate(" + columnChart.x(d.name) + ",0)";
            });

        categories.enter()
            .append("g")
            .attr("class", "category")
            .attr("transform", function (d) {
                return "translate(" + columnChart.x(d.name) + ",0)";
            });

        var columns = categories.selectAll("rect.column")
            .data(data.sets, function (d) {
                return d.name;
            });

        columns.exit()
            .style("fill", "#e59393")
            .transition()
            .duration(options.transition.delay.remove)
            .attr("y", columnChart.y(0))
            .attr("height", options.height - columnChart.y(0))
            .remove();

        columns.transition()
            .duration(options.transition.delay.update)
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? columnChart.x(d.name) : columnChart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? columnChart.x.rangeBand() : columnChart.xGroup.rangeBand();
            })
            .attr("height", function (d, setIx, catIx) {
                return options.height - columnChart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) { return options.height - columnChart.y(set.values[catIx]); });
                else
                    return columnChart.y(d.values[catIx]);
            });

        columns.enter()
            .append("rect")
            .attr("class", "column")
            .style("fill", function (d, setIx) {
                return d.fill || d3.scale.category20().range()[setIx % 20];
            })
            .attr("x", function (d) {
                return options.columnChart.isStacked == true ? columnChart.x(d.name) : columnChart.xGroup(d.name);
            })
            .attr("width", function () {
                return options.columnChart.isStacked == true ? columnChart.x.rangeBand() : columnChart.xGroup.rangeBand();
            })
            .attr("height", 0)
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx), function (set) { return options.height - columnChart.y(set.values[catIx]); });
                else
                    return options.height;
            })
            .transition()
            .duration(options.transition.delay.insert)
            .attr("height", function (d, setIx, catIx) {
                return options.height - columnChart.y(d.values[catIx]);
            })
            .attr("y", function (d, setIx, catIx) {
                if (options.columnChart.isStacked == true)
                    return options.height - d3.sum(data.sets.slice(0, setIx + 1), function (set) { return options.height - columnChart.y(set.values[catIx]); });
                else
                    return columnChart.y(d.values[catIx]);
            });

        return chart;
    };
    
    return yawd3;

}));