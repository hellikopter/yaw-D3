﻿/* 
    Data format for line chart
    
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
                ...],
                colour: colour3
            },{
                ...
            }]
        }
*/

var lineChartDataDate = {
    sets: [{
        name: "Apple",
        values: [{
            x: "2016-01-01",
            y: 10
        }, {
            x: "2016-02-01",
            y: 20
        }, {
            x: "2016-03-01",
            y: 30
        }, {
            x: "2016-04-01",
            y: 40
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: "2016-01-01",
            y: 5
        }, {
            x: "2016-02-01",
            y: 10
        }, {
            x: "2016-03-01",
            y: 15
        }, {
            x: "2016-04-01",
            y: 20
        }],
        colour: "#323a45"
    }, {
        name: "Banana",
        values: [{
            x: "2016-01-01",
            y: 2
        }, {
            x: "2016-02-01",
            y: 4
        }, {
            x: "2016-03-01",
            y: 6
        }, {
            x: "2016-04-01",
            y: 8
        }],
        colour: "#aeb0b5"
    }]
};

var lineChartDataDateUpdate = {
    sets: [{
        name: "Apple",
        values: [{
            x: "2016-01-01",
            y: 10
        }, {
            x: "2016-02-01",
            y: 20
        }, {
            x: "2016-03-01",
            y: 30
        }, {
            x: "2016-04-01",
            y: 40
        }, {
            x: "2016-05-01",
            y: 60
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: "2016-01-01",
            y: 5
        }, {
            x: "2016-02-01",
            y: 10
        }, {
            x: "2016-03-01",
            y: 40
        }, {
            x: "2016-04-01",
            y: 20
        }, {
            x: "2016-05-01",
            y: 50
        }],
        colour: "#323a45"
    }, {
        name: "Orange",
        values: [{
            x: "2016-01-01",
            y: 20
        }, {
            x: "2016-02-01",
            y: 4
        }, {
            x: "2016-03-01",
            y: 10
        }, {
            x: "2016-04-01",
            y: 4
        }, {
            x: "2016-05-01",
            y: 40
        }],
        colour: "#fdb81e"
    }]
};

var lineChartDataValue = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10
        }, {
            x: 0,
            y: 20
        }, {
            x: 20,
            y: 30
        }, {
            x: 60,
            y: 40
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: -50,
            y: 5
        }, {
            x: 20,
            y: 10
        }, {
            x: 30,
            y: 15
        }, {
            x: 60,
            y: 20
        }],
        colour: "#323a45"
    }, {
        name: "Banana",
        values: [{
            x: -50,
            y: 2
        }, {
            x: 0,
            y: 4
        }, {
            x: 20,
            y: 6
        }, {
            x: 60,
            y: 8
        }],
        colour: "#aeb0b5"
    }]    
};

var lineChartDataValueUpdate = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10
        }, {
            x: 0,
            y: 20
        }, {
            x: 40,
            y: 30
        }, {
            x: 60,
            y: 40
        }, {
            x: 80,
            y: 50
        }],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [{
            x: -50,
            y: 5
        }, {
            x: 50,
            y: 10
        }, {
            x: 55,
            y: 15
        }, {
            x: 60,
            y: 20
        }, {
            x: 65,
            y: 25
        }],
        colour: "#323a45"
    }, {
        name: "Orange",
        values: [{
            x: -50,
            y: 12
        }, {
            x: 30,
            y: 14
        }, {
            x: 40,
            y: 16
        }, {
            x: 60,
            y: 18
        }, {
            x: 70,
            y: 10
        }],
        colour: "#fdb81e"
    }]
};

