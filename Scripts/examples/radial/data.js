/* 
    Data format for radial diagram
    
    data={        
        children:[{
            name: setName1,
            size: size1,
            colour: colour1,
            children: [{
                name: setName1a,
                size: size1a,
                colour: colour1a,
                children: {
                    ...
                    }
                }
              ]
          }, {
            name: setName2,
            size: size2,
            colour: colour2
          }, {
                ...
        }]
    }    
*/

var radialDiagramData = {    
    children: [{
        name: "Apple",
        colour: "#0071bc",
        size: 100,
        children: [{
            name: "Apple US",
            colour: "#205493",
            size: 40
        }, {
            name: "Apple UK",
            colour: "#112e51",
            size: 60,
            children: [{
                name: "Apple Wales",
                colour: "#212121",
                size: 20
            }, {
                name: "Apple England",
                size: 30,
                colour: "#02bfe7",
                children: [{
                    name: "Apple East Midlands",
                    colour: "#046b99",
                    size: 15
                }, {
                    name: "Apple West Midlands",
                    colour: "#9bdaf1",
                    size: 15
                }]
            }, {
                name: "Apple Scotland",
                colour: "#8ba6ca",
                size: 10
            }]
        }]
    }, {
        name: "Pear",
        colour: "#323a45",
        size: 200,
        children: [{
            name: "Pear France",
            colour: "#aeb0b5",
            size: 50
        }, {
            name: "Pear Italy",
            colour: "#5b616b",
            size: 60
        }, {
            name: "Pear Sweden",
            colour: "#494440",
            size: 70
        }, {
            name: "Pear Germany",
            colour: "#aeb0b5",
            size: 20
        }]
    }, {
        name: "Banana",
        colour: "#4c2c92",
        size: 80
    }]
};


var radialDiagramDataUpdate = {    
    children: [{
        name: "Apple",
        colour: "#0071bc",
        size: 230,
        children: [{
            name: "Apple US",
            colour: "#205493",
            size: 30
        }, {
            name: "Apple UK",
            colour: "#112e51",
            size: 200,
            children: [{
                name: "Apple Wales",
                colour: "#212121",
                size: 100
            }, {
                name: "Apple England",
                colour: "#02bfe7",
                size: 40,
                children: [{
                    name: "Apple East Midlands",
                    colour: "#046b99",
                    size: 30
                }, {
                    name: "Apple West Midlands",
                    colour: "#9bdaf1",
                    size: 10
                }]
            }, {
                name: "Apple Scotland",
                colour: "#8ba6ca",
                size: 70
            }]
        }]
    }, {
        name: "Orange",
        colour: "#fdb81e",
        size: 150,
        children: [{
            name: "Orange UK",
            colour: "#fad980",
            size: 20
        }, {
            name: "Orange Ireland",
            colour: "#fff1d2",
            size: 50
        }, {
            name: "Orange Isle of Man",
            colour: "#f9c642",
            size: 30
        }, {
            name: "Orange Germany",
            colour: "#fff1d2",
            size: 50
        }]
    }, {
        name: "Banana",
        colour: "#4c2c92",
        size: 50
    }]
};

