/* 
    Data format for column chart
    
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
            categories:[categoryName1, categoryName2, ...]
        }
*/

var columnChartData = {
    sets: [{
        name: "Apple",
        values: [10, 20, 30, 40],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [5, 10, 15, 20],
        colour: "#323a45"
    }, {
        name: "Banana",
        values: [2, 4, 6, 8],
        colour: "#aeb0b5"
    }],
    categories: ["January", "February", "March", "April"]
};

var columnChartDataUpdate = {
    sets: [{
        name: "Apple",
        values: [100, 20, 0, 20, 60],
        colour: "#0071bc"
    }, {
        name: "Pear",
        values: [50, 10, 0, 10, 50],
        colour: "#323a45"
    }, {
        name: "Orange",
        values: [20, 4, 1, 4, 40],
        colour: "#fdb81e"
    }, {
        name: "Melon",
        values: [10, 15, 5, 30, 30],
        colour: "#2e8540"
    }],
    categories: ["January", "February", "March", "April", "May"]
};

var columnChartDataSimple = {
    sets: [{
        name: "Apple",
        values: [10, 20, 30, 40],
        colour: "#0071bc"
    }],
    categories: ["January", "February", "March", "April"]
};

var columnChartDataSimpleUpdate = {
    sets: [{
        name: "Apple",
        values: [100, 20, 0, 20, 60],
        colour: "#0071bc"
    }],
    categories: ["January", "February", "March", "April", "May"]
};