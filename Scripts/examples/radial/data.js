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
        size: 100,
        children: [{
            name: "Apple US",
            size: 40
        }, {
            name: "Apple UK",
            size: 60,
            children: [{
                name: "Apple Wales",
                size: 20
            }, {
                name: "Apple England",
                size: 30,
                children: [{
                    name: "Apple East Midlands",
                    size: 15
                }, {
                    name: "Apple West Midlands",
                    size: 15
                }]
            }, {
                name: "Apple Scotland",
                size: 10
            }]
        }]
    }, {
        name: "Pear",
        size: 200,
        children: [{
            name: "Pear France",
            size: 50
        }, {
            name: "Pear Italy",
            size: 60
        }, {
            name: "Pear Sweden",
            size: 70
        }, {
            name: "Pear Germany",
            size: 20
        }]
    }, {
        name: "Banana",
        size: 80
    }]
};


var radialDiagramDataUpdate = {    
    children: [{
        name: "Apple",
        size: 230,
        children: [{
            name: "Apple US",
            size: 30
        }, {
            name: "Apple UK",
            size: 200,
            children: [{
                name: "Apple Wales",
                size: 100
            }, {
                name: "Apple England",
                size: 40,
                children: [{
                    name: "Apple East Midlands",
                    size: 30
                }, {
                    name: "Apple West Midlands",
                    size: 10
                }]
            }, {
                name: "Apple Scotland",
                size: 70
            }]
        }]
    }, {
        name: "Orange",
        size: 150,
        children: [{
            name: "Orange UK",
            size: 20
        }, {
            name: "Orange Ireland",
            size: 50
        }, {
            name: "Orange Isle of Man",
            size: 30
        }, {
            name: "Orange Germany",
            size: 50
        }]
    }, {
        name: "Banana",
        size: 50
    }]
};

