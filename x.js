//Trade off between query performance vs consistency

// Using Reference (Normalization) -> CONSISTENCY
let author = {
    name: 'Jamie'
}

let course = {
    author: 'id',
    // authors: [
    //     'id1',
    //     'id2'
    // ]
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Jamie'
    }//object
}

// Hybrid Approach
let author = {
    name : 'Jamie'
    // 50 other properties
}

let course = {
    author : {
        id: 'ref',
        name: 'Jamie'
    }
}
