/* 
    Data format for line chart
    
    data={
            sets:[ {
                name: setName1,
                values: [set1category1,set1category2, ...],
                colour: colour1
            }, {
                name: setName2, 
                values: [set1category1,set1category2, ...],
                colour: colour2
            },{
                name: setName3, 
                values: [set1category1,set1category2, ...],
                colour: colour3
            },{
                ...
            }],
            categories:[categoryName1,categoryName2, ...],
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
    }]
};

var lineChartDataValue = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10
        }, {
            x: 20,
            y: 20
        }, {
            x: 0,
            y: 30
        }, {
            x: 60,
            y: 40
        }]
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
        }]
    }, {
        name: "Banana",
        values: [{
            x: -50,
            y: 2
        }, {
            x: 20,
            y: 4
        }, {
            x: 0,
            y: 6
        }, {
            x: 60,
            y: 8
        }]
    }]    
};

var lineChartDataValueUpdate = {
    sets: [{
        name: "Apple",
        values: [{
            x: -50,
            y: 10
        }, {
            x: 40,
            y: 20
        }, {
            x: 0,
            y: 30
        }, {
            x: 60,
            y: 40
        }, {
            x: 80,
            y: 50
        }]
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
        }]
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
        }]
    }]
};

