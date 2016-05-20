/* 
    Data format for tree diagram
    
    data={
        name: setName,
        children:[{
            name: setName1
            children: [{
                name: setName1a,
                children: {
                    ...
                    }
                }
              ]
          }, {
            name: setName2
          }, {
                ...
        }]
    }    
*/

var treeDiagramData = {
    name: "Items",
    children: [{
        name: "Apple",
        children: [{
            name: "Apple US",
        }, {
            name: "Apple UK",
            children: [{
                name: "Apple Wales"
            }, {
                name: "Apple England",
                children: [{
                    name: "Apple East Midlands"
                }, {
                    name: "Apple West Midlands"
                }]
            }, {
                name: "Apple Scotland"
            }]
        }]
    }, {
        name: "Pear",
        children: [{
            name: "Pear France"
        }, {
            name: "Pear Italy"
        }, {
            name: "Pear Sweden"
        }, {
            name: "Pear Germany"
        }]
    }, {
        name: "Banana",
    }]
};

