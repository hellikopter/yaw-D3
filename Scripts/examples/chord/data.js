/* 
    Data format for chord diagram
    
    data={
        sets: [{
            id: setId1,
            name: setName1,
            colour: colour1,
            relations: [setIdX, setIdY, ...]
        }, {
            id: setId2,
            name: setName2,
            colour: colour2,
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
        colour: "#0071bc",
        relations: [2]
    }, {
        id: 2,
        name: "Pear",
        colour: "#323a45",
        relations: [1]
    }, {
        id: 3,
        name: "Orange",
        colour: "#fdb81e",
        relations: [4, 5]
    }, {
        id: 4,
        name: "Banana",
        colour: "#aeb0b5",
        relations: [3, 5]
    }, {
        id: 5,
        name: "Lemon",
        colour: "#2e8540",
        relations: [3, 4]
    }]
};

