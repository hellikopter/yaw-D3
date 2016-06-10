/* 
    Data format for pie chart
    
    data={
            sets:[ {
                name: setName1,
                value: set1value,
                colour: colour1
            }, {
                name: setName2, 
                value: set1value,
                colour: colour2
            },{
                name: setName3, 
                value: set1value,
                colour: colour3
            },{
                ...
            }]
        }
*/

var pieChartData = {
    sets: [{
        name: "Apple",
        value: 20,
        colour: "#0071bc"
    }, {
        name: "Pear",
        value: 30,
        colour: "#323a45"
    }, {
        name: "Banana",
        value: 50,
        colour: "#aeb0b5"
    }]
};

var pieChartDataUpdate = {
    sets: [{
        name: "Apple",
        value: 40,
        colour: "#0071bc"
    }, {
        name: "Pear",
        value: 50,
        colour: "#323a45"
    }, {
        name: "Orange",
        value: 10,
        colour: "#fdb81e"
    }]
};
