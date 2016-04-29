/* 
    Data format for column chart
    
    data={
            sets:[ {
                name: setName1,
                values: [set1category1,set1category2, ...]
            }, {
                name: setName2, 
                values: [set1category1,set1category2, ...]
            },{
                name: setName3, 
                values: [set1category1,set1category2, ...]
            },{
                ...
            }],
            categories:[{
                name: categoryName1,
                fill: fillColour
            }, {
                name: categoryName2,
                fill: fillColour
            }, {
                ...
            }],
        }
*/

var columnChartData = {
    sets: [{
        name: "Apple",
        values: [10, 20, 30, 40]
    }, {
        name: "Pear",
        values: [5, 10, 15, 20]
    }, {
        name: "Banana",
        values: [2, 4, 6, 8]
    }],
    categories: [{
        name: "January"
    }, {
        name: "February"
    }, {
        name: "March"
    }, {
        name: "April"
    }]
};

var columnChartDataUpdate = {
    sets: [{
        name: "Apple",
        values: [100, 20, 0, 20, 60]
    }, {
        name: "Pear",
        values: [50, 10, 0, 10, 50]
    }, {
        name: "Orange",
        values: [20, 4, 1, 4, 40]
    }, {
        name: "Melon",
        values: [10, 15, 5, 30, 30]
    }],
    categories: [{
        name: "January"
    }, {
        name: "February"
    }, {
        name: "March"
    }, {
        name: "April"
    }, {
        name: "May"
    }]
};

var columnChartDataSimple = {
    sets: [{
        name: "Apple",
        values: [10, 20, 30, 40]
    }],
    categories: [{
        name: "January"
    }, {
        name: "February"
    }, {
        name: "March"
    }, {
        name: "April"
    }]
};

var columnChartDataSimpleUpdate = {
    sets: [{
        name: "Apple",
        values: [100, 20, 0, 20, 60]
    }],
    categories: [{
        name: "January"
    }, {
        name: "February"
    }, {
        name: "March"
    }, {
        name: "April"
    }, {
        name: "May"
    }]
};