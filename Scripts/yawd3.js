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
        bubble: 4
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
            isArea: false
        },

        pieChart: {
            isDoughnut: false
        },

        bubbleChart: {
            isTimeCategory: false,
            categoryTimeFormat: "%Y-%m-%d"
        },
    };

    yawd3.drawChart = function (options, data) {
        checkOptions(options);
        options = setToDefaultOptions(options);
        checkDataOptions(options.chartType, data);

        switch (options.chartType) {
            case yawd3.chartKind.column:
                createColumnChart(options, data);
                break;
            case yawd3.chartKind.line:
                createLineChart(options, data);
                break;
            case yawd3.chartKind.pie:
                createPieChart(options, data);
                break;
            case yawd3.chartKind.bubble:
                createBubbleChart(options, data);
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
            case yawd3.chartKind.line:
                updateLineChart(options, data);
                break;
            case yawd3.chartKind.pie:
                updatePieChart(options, data);
                break;
            case yawd3.chartKind.bubble:
                updateBubbleChart(options, data);
                break;
        }
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
            (options.chartType != yawd3.chartKind.bubble))
            throw new Error("Invalid chart type");
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
        }
        if (options.chartType == yawd3.chartKind.pie) {
            options.pieChart = options.pieChart || yawd3.defaultOptions.pieChart;
            options.pieChart.isDoughnut = options.pieChart.isDoughnut || yawd3.defaultOptions.pieChart.isDoughnut;
        }
        if (options.chartType == yawd3.chartKind.bubble) {
            options.bubbleChart = options.bubbleChart || yawd3.defaultOptions.bubbleChart;
            options.bubbleChart.isTimeCategory = options.bubbleChart.isTimeCategory || yawd3.defaultOptions.bubbleChart.isTimeCategory;
            options.bubbleChart.categoryTimeFormat = options.bubbleChart.categoryTimeFormat || yawd3.defaultOptions.bubbleChart.categoryTimeFormat;
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
            .attr("data-chart-type", options.chartType);

        switch (options.chartType) {
            case yawd3.chartKind.column:
            case yawd3.chartKind.line:
            case yawd3.chartKind.bubble:
                chart.attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");
                break;
            case yawd3.chartKind.pie: 
                chart.attr("transform", "translate(" + (options.width / 2) + "," + (options.height / 2) + ")");
                break;
        }
        
        return chart;
    };

    //column

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
            .style("fill", options.transition.exitColour)
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
    };

    //line

    function setupLineChart(data, isTimeCategory, categoryTimeFormat, interpolation, isArea,
        height, width) {
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
            .orient("bottom");

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

    function createLineChart(options, data) {
        var chart = chartSetup(options);
        var lineChart = setupLineChart(data, options.lineChart.isTimeCategory, options.lineChart.categoryTimeFormat,
            options.lineChart.interpolation, options.lineChart.isArea, options.height, options.width);

        chart.selectAll(".line")
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
                return lineChart.line(d.values);
            })
            .style("stroke", function (d, ix) {
                return d.colour || d3.scale.category20().range()[ix % 20]
            });

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(lineChart.xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(lineChart.yAxis);
    };

    function updateLineChart(options, data) {
        var lineChart = setupLineChart(data, options.lineChart.isTimeCategory, options.lineChart.categoryTimeFormat,
            options.lineChart.interpolation, options.lineChart.isArea, options.height, options.width);

        var chart = d3.select(options.chartId + " g");

        chart.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(lineChart.xAxis);

        chart.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(lineChart.yAxis);

        var sets = chart.selectAll("g.line")
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
                return lineChart.line(data.sets[setIx].values);
            })
            .style("stroke", function (d, catIx, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20]
            });
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

    function createPieChart(options, data) {
        var chart = chartSetup(options);
        var pieChart = setupPieChart(options.pieChart.isDoughnut, options.height, options.width);

        chart.selectAll("path")
            .data(pieChart.pie(data.sets), function (d) {
                return d.data.name;
            })
            .enter()
            .append("path")
            .attr("class", "pie")
            .attr("d", pieChart.arc)
            .style("fill", function (d, ix) {
                return d.data.fill || d3.scale.category20().range()[ix % 20];
            })
            .each(function (d) { this._current = d; });
    };

    function updatePieChart(options, data) {
        var pieChart = setupPieChart(options.pieChart.isDoughnut, options.height, options.width);

        var chart = d3.select(options.chartId + " g");

        var sets = chart.selectAll("path.pie")
            .data(pieChart.pie(data.sets), function (d) {
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
            .attr("d", pieChart.arc)
            .style("fill", function (d, ix) {
                return d.data.fill || d3.scale.category20().range()[ix % 20];
            })
            .each(function (d) { this._current = d; });
        
        sets.transition()
            .duration(options.transition.delay.update)            
            .attrTween("d", pieChart.arcTween)
            .attr("transform", null);

    };

    //bubble

    function setupBubbleChart(data, isTimeCategory, categoryTimeFormat, height, width) {
        var x = null;
        var xMinValue = null;
        var xMaxValue = null;
        var yMinValue = null;
        var yMaxValue = null;
        var colours = {};

        var minX=function(values){
            return d3.min(values, function (val) {
                if (isTimeCategory == true)
                    return d3.time.format(categoryTimeFormat).parse(val.x);
                else
                    return val.x;
            });
        };

        var maxX=function(values){
            return d3.max(values, function (val) {
                if (isTimeCategory == true)
                    return d3.time.format(categoryTimeFormat).parse(val.x);
                else
                    return val.x;
            });
        };

        var minY=function(values){
            return d3.min(values, function (val) {
                return val.y;
            });
        };

        var maxY=function(values){
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
            .orient("bottom");

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

    function createBubbleChart(options, data) {
        var chart = chartSetup(options);
        var bubbleChart = setupBubbleChart(data, options.bubbleChart.isTimeCategory, options.bubbleChart.categoryTimeFormat,
            options.height, options.width);        

        var sets=chart.selectAll(".bubble")
            .data(data.sets.map(function (d) {
                return d.name;
            }))
            .enter()
            .append("g")
            .attr("class", "bubble");

        sets.selectAll("circle")
            .data(bubbleChart.selectedSetValues, function (d) {
                return d.x + ":" + d.y;
            })
            .enter()
            .append("circle")
            .style("fill", function (d, catIx, setIx) {
                return bubbleChart.colours[data.sets[setIx].name](d.y);
            })
            .style("stroke", function (d, catIx, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20]
            })
            .style("stroke-width", 2)
            .style("opacity", 0.8)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - bubbleChart.y(d.size)), 1]);
            })
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return bubbleChart.x(x);
            })
            .attr("cy", function (d) {
                return bubbleChart.y(d.y);
            });

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + options.height + ")")
            .call(bubbleChart.xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(bubbleChart.yAxis);
    };

    function updateBubbleChart(options, data) {
        var bubbleChart = setupBubbleChart(data, options.bubbleChart.isTimeCategory, options.bubbleChart.categoryTimeFormat,
            options.height, options.width);

        var chart = d3.select(options.chartId + " g");

        chart.select(".x.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(bubbleChart.xAxis);

        chart.select(".y.axis")
            .transition()
            .duration(options.transition.delay.update)
            .ease("sin-in-out")
            .call(bubbleChart.yAxis);

        var sets = chart.selectAll("g.bubble")
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

        var values=sets.selectAll("circle")
            .data(bubbleChart.selectedSetValues, function (d) {
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
                return bubbleChart.colours[data.sets[setIx].name](d.y);
            })
            .style("stroke", function (d, catIx, setIx) {
                return d.colour || d3.scale.category20().range()[setIx % 20]
            })
            .style("stroke-width",2)
            .style("opacity", 0.8)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - bubbleChart.y(d.size)), 1]);
            })
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return bubbleChart.x(x);
            })
            .attr("cy", function (d) {
                return bubbleChart.y(d.y);
            });

        values.transition()
            .duration(options.transition.delay.update)                        
            .attr("cx", function (d) {
                var x = null;
                if (options.bubbleChart.isTimeCategory == true)
                    x = d3.time.format(options.bubbleChart.categoryTimeFormat).parse(d.x);
                else
                    x = d.x;
                return bubbleChart.x(x);
            })
            .attr("cy", function (d) {
                return bubbleChart.y(d.y);
            })
            .transition()
            .duration(options.transition.delay.update)
            .attr("r", function (d) {
                return d3.max([Math.sqrt(options.height - bubbleChart.y(d.size)), 1]);
            });
    };

    return yawd3;

}));