/* 
    Data format for chord diagram
    
    data={
        sets: [{
            id: setId1,
            name: setName1,
            relations: [setIdX, setIdY, ...]
        }, {
            id: setId2,
            name: setName2,
            relations: [setIdA, setIdB, ...]
        }, {
                ...
        }]
    }    
*/

var chordDiagramData = {
    sets: [{
        id: 1,
        name: "Apple",
        relations: [2]
    }, {
        id: 2,
        name: "Pear",
        relations: [1]
    }, {
        id: 3,
        name: "Orange",
        relations: [4, 5]
    }, {
        id: 4,
        name: "Banana",
        relations: [3, 5]
    }, {
        id: 5,
        name: "Lemon",
        relations: [3, 4]
    }]
};

