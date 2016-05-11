/* 
    Data format for pie chart
    
    data={
            sets:[ {
                name: setName1,
                value: set1value,
                fill: colour1
            }, {
                name: setName2, 
                value: set1value,
                fill: colour2
            },{
                name: setName3, 
                value: set1value,
                fill: colour3
            },{
                ...
            }]
        }
*/

var pieChartData = {
    sets: [{
        name: "Apple",
        value: 20,
    }, {
        name: "Pear",
        value: 30
    }, {
        name: "Banana",
        value: 50
    }]
};

var pieChartDataUpdate = {
    sets: [{
        name: "Apple",
        value: 40
    }, {
        name: "Pear",
        value: 50
    }, {
        name: "Orange",
        value: 10
    }]
};
