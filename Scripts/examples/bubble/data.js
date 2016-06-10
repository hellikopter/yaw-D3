/* 
    Data format for bubble chart
    
    data={
            sets:[ {
                name: setName1,
                values: [{
                        x: set1val1x,
                        y: set1val1y
                    },{
                        x: set1val2x,
                        y: set1val2y
                    },
                    ...
                ],
                colour: colour1
            }, {
                name: setName2, 
                values: [{
                        x: set2val1x,
                        y: set2val1y
                    },{       
                        x: set2val2x,
                        y: set2val2y
                    },
                    ...
                ],
                colour: colour2
            },{
                name: setName3, 
                values: [{
                        x: set3val1x,
                        y: set3val1y
                    },{       
                        x: set3val2x,
                        y: set3val2y
                    },
                    ...
                ],
                colour: colour3
            },{
                ...
            }]
        }
*/

var bubbleChartDataDate = {
    sets: [{
        name: "Apple",
        values: [{
            x: "2016-01-01",
            y: 10,
            size: 10
        }, {
            x: "2016-02-01",
            y: 20,
            size: 20
        }, {
            x: "2016-03-01",
            y: 30,
            size: 30
        }, {
            x: "2016-04-01",
            y: 40,
            size: 40
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: "2016-01-01",
            y: 5,
            size: 5
        }, {
            x: "2016-02-01",
            y: 7,
            size: 10
        }, {
            x: "2016-03-01",
            y: 15,
            size: 15
        }, {
            x: "2016-04-01",
            y: 22,
            size: 20
        }],
        colour: "#323a45"
    }, {
        name: "Banana",
        values: [{
            x: "2016-01-01",
            y: 2,
            size: 2
        }, {
            x: "2016-02-01",
            y: 4,
            size: 4
        }, {
            x: "2016-03-01",
            y: 6,
            size: 6
        }, {
            x: "2016-04-01",
            y: 8,
            size: 8
        }],
        colour: "#4c2c92"
    }]
};

var bubbleChartDataDateUpdate = {
    sets: [{
        name: "Apple",
        values: [{
            x: "2016-01-01",
            y: 10,
            size: 20
        }, {
            x: "2016-02-01",
            y: 20,
            size: 20
        }, {
            x: "2016-03-01",
            y: 30,
            size: 30
        }, {
            x: "2016-04-01",
            y: 40,
            size: 20
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: "2016-01-01",
            y: 5,
            size: 15
        }, {
            x: "2016-02-01",
            y: 25,
            size: 10
        }, {
            x: "2016-03-01",
            y: 40,
            size: 15
        }, {
            x: "2016-04-01",
            y: 65,
            size: 10
        }],
        colour: "#323a45"
    }, {
        name: "Orange",
        values: [{
            x: "2016-01-01",
            y: 12,
            size: 12
        }, {
            x: "2016-02-01",
            y: 14,
            size: 14
        }, {
            x: "2016-03-01",
            y: 16,
            size: 16
        }, {
            x: "2016-04-01",
            y: 18,
            size: 18
        }, {
            x: "2016-05-01",
            y: 24,
            size: 10
        }],
        colour: "#fdb81e"
    }]
};

var bubbleChartDataValue = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10,
            size: 10
        }, {
            x: 20,
            y: 20,
            size: 20
        }, {
            x: 0,
            y: 30,
            size: 30
        }, {
            x: 60,
            y: 40,
            size: 40
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: -50,
            y: 5,
            size: 5
        }, {
            x: 20,
            y: 7,
            size: 10
        }, {
            x: 30,
            y: 15,
            size: 15
        }, {
            x: 60,
            y: 22,
            size: 20
        }],
        colour: "#323a45"
    }, {
        name: "Banana",
        values: [{
            x: -50,
            y: 2,
            size: 12
        }, {
            x: 20,
            y: 4,
            size: 4
        }, {
            x: 0,
            y: 6,
            size: 6
        }, {
            x: 60,
            y: 8,
            size: 8
        }],
        colour: "#4c2c92"
    }]
};

var bubbleChartDataValueUpdate = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10,
            size: 20
        }, {
            x: 20,
            y: 20,
            size: 20
        }, {
            x: 30,
            y: 30,
            size: 30
        }, {
            x: 30,
            y: 40,
            size: 20
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: -50,
            y: 5,
            size: 15
        }, {
            x: 20,
            y: 7,
            size: 10
        }, {
            x: 40,
            y: 45,
            size: 15
        }, {
            x: 60,
            y: 65,
            size: 10
        }],
        colour: "#323a45"
    }, {
        name: "Orange",
        values: [{
            x: 0,
            y: 12,
            size: 12
        }, {
            x: 10,
            y: 14,
            size: 14
        }, {
            x: 20,
            y: 16,
            size: 16
        }, {
            x: 30,
            y: 18,
            size: 18
        }, {
            x: 40,
            y: 24,
            size: 10
        }],
        colour: "#fdb81e"
    }]
};

