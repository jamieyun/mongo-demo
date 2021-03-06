const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(error => console.log('Could not connect to MongoDB...',error));

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength:5,
        maxlength:255,
        // match://
    },
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true

    },
    author: String,
    tags: {
        type: Array,
        // required: true
        validate: {
            // isAsync: true,
            validator: function(v) {
                
                    const result = v && v.length > 0;
                    // callback(result)
                return result;
                
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type:Date, default: Date.now },
    isPublished: Boolean,
    price:{
        type: Number,
        required: function(){
            //arrow func 은 this 를 사용할수 없음!!
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});
const Course = mongoose.model('Course', courseSchema);
//Classes, Objects
//Course, nodeCourse
async function createCourse(){

    const course = new Course({
        name: 'Angular Course',
        category:'Web ',
        author: 'Jamie',
        tags:['frontend'],
        isPublished: true,
        price: 15.8,        
    });

    try {
        const result = await course.save();    
       
        console.log(result);
    } catch (ex) {
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        // console.log(ex.message)
        
    }

}
// createCourse();
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

    //pagination 
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10;

    const courses = await Course
    // .find({author:'Jamie',isPublished:true})                    
    // Stars with Jamie regular expressions
    // .find({ author: /^Jamie/})
    // Ends with yun
    // .find({author:/Yun$/i})
    //Contains Jamie
    // .find({author:/.*Jamie.*$/i})
    .find({_id:'5f068120cb7d130fcaa2721e'})
    // .find({author: 'Jamie', isPublished: true})
    // .find({price: { $gt: 10 }})
    // .find({price: { $gte: 10, $lte: 20 }})
    // .find( { price: { $in: [10, 15, 20]} } )
    
    /*logical query*/
    // .find()
    // .or([ {author:'Jamie'}, {isPublished: true} ])
    // .and([ ])

    // .skip((pageNumber - 1) * pageSize)//pagination
    // .limit(pageSize)
    .sort({ name: -1})
    // .select({ name: 1, tags: 1 })
    // .count()
    ;
    console.log(courses[0].price)
}
getCourses();
async function updateCourse(id){
    // Approach : Query first
    // findbyid()
    //Modify its properties
    // save()
    console.log(id)
    const result = await Course.findByIdAndUpdate(id , {
        $set:{
            author: 'Jason',
            isPublished: false
        }
    } , { new: true});
    // console.log(course)
    // if(!course) return;

    // if(course.isPublished) return;

    // course.isPublished = true;
    // course.author = 'Another Author';
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    // const result = await course.save();
    console.log(result);

    //Approach: update first
    // update directly
    //Optionally : get the updated document

}
// getCourses();

async function removeCourse(id){
//    const result = await Course.deleteOne({_id: id});
// const result = await Course.deleteMany({_id: id});
    const result = await Course.deleteOne({name: id});
    console.log(result)
}
// removeCourse('Express.js Course');
