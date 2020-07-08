const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(error => console.log('Could not connect to MongoDB...',error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type:Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
//Classes, Objects
//Course, nodeCourse
async function createCourse(){


const course = new Course({
    name: 'Angular Course',
    author: 'Jamie',
    tags:['angular','frontend'],
    isPublished: true
});

try {
    const result = await course.save();    
    console.log(result);
} catch (error) {
    console.log(error)
}

}

async function getCourses(){
    //eq(equal)
    //ne(not equal)
    //gt(great than)
    //gte(great than or equal to)
    // lt(less than)
    //lte ( less than or equal to)
    // in
    // nin( not in)

    //logical query operators
    // or 
    // and

    const courses = await Course
    // .find({author:'Jamie',isPublished:true})                    
    // Stars with Jamie regular expressions
    // .find({ author: /^Jamie/})
    // Ends with yun
    // .find({author:/Yun$/i})
    //Contains Jamie
    .find({author:/.*Jamie.*$/i})

    // .find({author: 'Jamie', isPublished: true})
    // .find({price: { $gt: 10 }})
    // .find({price: { $gte: 10, $lte: 20 }})
    // .find( { price: { $in: [10, 15, 20]} } )
    
    /*logical query*/
    // .find()
    // .or([ {author:'Jamie'}, {isPublished: true} ])
    // .and([ ])
    .limit(10)
    .sort({ name: -1})
    // .select({ name: 1, tags: 1 })
    .count()
    ;
    console.log(courses)
}

getCourses();